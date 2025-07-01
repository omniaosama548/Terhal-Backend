import express from 'express';
import mongoose from 'mongoose';
// Importing environment variables
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

//get all places
app.get('/places', async (req, res) => {
  try {
    const places = await mongoose.connection.db.collection('places').find({}).toArray();
    res.json(places);
  } catch (error) {
    console.error('Error fetching places:', error);
    res.status(500).send('Internal Server Error');
  }
});

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((err) => {
  console.error('MongoDB connection error:', err);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
