// models/favourite.js
import mongoose from 'mongoose';

const favouriteSchema = new mongoose.Schema({
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

const Favourite = mongoose.model('Favourite', favouriteSchema);

export default Favourite;
