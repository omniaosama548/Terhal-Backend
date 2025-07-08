import mongoose from 'mongoose';

const historySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true,
  },
  placeId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Place',
    required: true,
  },
}, {
  timestamps: true,
});

const History = mongoose.model('History', historySchema);
export default History;
