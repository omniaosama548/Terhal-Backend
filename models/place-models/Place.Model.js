// models/place.js
import mongoose from 'mongoose';

const placeSchema = new mongoose.Schema({
  Name: {   //Name with capital N to match the original code
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: null, 
  },
  location: String,
  address: String,
  category: String,
  coordinates: String,
  image: String,
  rating: {
    type: Number,
    default: 0,
  },
  visible: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true, // optional: adds createdAt, updatedAt
});

const Place = mongoose.model('Place', placeSchema);

export default Place;
