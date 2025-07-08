// models/favourite.js
import mongoose from 'mongoose';

const favouriteSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  placeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Place', required: true }
}, {
  timestamps: true,
});

const Favourite = mongoose.model('Favourite', favouriteSchema);

export default Favourite;
