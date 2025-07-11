import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import './cron/deleteInactiveUsers.js';

import authRoutes from './routes/authRoutes.js';
import favouriteRoutes from './routes/place-routes/FavouritePlace.Route.js';
import ratingRoutes from './routes/place-routes/RatingPlace.Route.js';
import placeRoutes from "./routes/placesRoutes.js";
import eventRouter from './routes/eventRoutes.js';
import adminRouter from './routes/adminRoutes.js';
import adminAuthRouter from './routes/adminAuthRoutes.js';
import historyRoutes from './routes/user-routes/history.route.js';
import deleteRoutes from './routes/user-routes/deleteUser.route.js';
import favoriteRoutes from './routes/user-routes/favorite.route.js';
import reviewRoutes from './routes/user-routes/review.route.js';



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

//  event routes
app.use("/events",eventRouter);

// user routes 
app.use('/user', historyRoutes);
app.use('/user', deleteRoutes);
app.use('/user', favoriteRoutes);
app.use('/user/reviews', reviewRoutes);




console.log("MONGO_URI =", process.env.MONGO_URI);


mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

