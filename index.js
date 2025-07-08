import express from 'express';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes.js';
import favouriteRoutes from './routes/place-routes/FavouritePlace.Route.js';
import ratingRoutes from './routes/place-routes/RatingPlace.Route.js';
import placeRoutes from "./routes/placesRoutes.js";
// Importing environment variables
import dotenv from 'dotenv';
import eventRouter from './routes/eventRoutes.js';
import adminRouter from './routes/adminRoutes.js';
import adminAuthRouter from './routes/adminAuthRoutes.js';
dotenv.config();

const app = express();
const port = 3000;
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/auth', authRoutes);
app.use('/auth/admin',adminAuthRouter);
app.use('/admin', adminRouter);
// [MODIFIED] /places/suggested endpoint is now available for both anonymous and registered users
// favourite routes
app.use("/places", favouriteRoutes);

// Use the rating route
app.use("/places", ratingRoutes);
app.use("/places", placeRoutes);

app.use("/events",eventRouter);

// [RE-ADDED] /places endpoint to return all visible places for testing (by user request)
app.get('/places', async (req, res) => {
  try {
    const Place = (await import('./models/Place.js')).default;
    const places = await Place.find({ visible: true });
    res.json(places);
  } catch (error) {
    console.error('Error fetching places:', error);
    res.status(500).send('Internal Server Error');
  }
});

console.log("MONGO_URI =", process.env.MONGO_URI);


// This makes all /places/* go to placeRoutes




mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
