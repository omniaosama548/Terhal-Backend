import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['happy', 'ordinary', 'sad'],
    required: true
  },
  review: {
    type: String,
    required: true
  },
  placeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Place' },
});

const Review = mongoose.model('Review', reviewSchema);
export default Review; 