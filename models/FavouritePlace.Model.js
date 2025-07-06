// models/favourite.js
import mongoose from 'mongoose';

const favouritePlaceSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  placeId: {
    type: String,
    required: true,
    ref: 'Place',
  },
}, {
  timestamps: true,
});

const FavouritePlace = mongoose.model('FavouritePlace', favouritePlaceSchema);

export default FavouritePlace;
