import Review from '../../models/Review.js';

// POST /user/reviews - Create a review (one per user)
export const createReview = async (req, res) => {
  try {
    const userId = req.user.id;
    const { status, review } = req.body;
    if (!['happy', 'ordinary', 'sad'].includes(status)) {
      return res.status(400).json({ message: 'Status must be one of: happy, ordinary, sad.' });
    }
    if (!review || typeof review !== 'string') {
      return res.status(400).json({ message: 'Review is required.' });
    }
    // Only one review per user
    const existing = await Review.findOne({ userId });
    if (existing) {
      return res.status(400).json({ message: 'You have already submitted a review.' });
    }
    const newReview = await Review.create({ userId, status, review });
    res.status(201).json({ success: true, review: newReview });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// GET /user/reviews - Get all reviews
export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find().populate('userId', 'name email');
    res.json({ success: true, reviews });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// GET /user/reviews/me - Get current user's review
export const getMyReview = async (req, res) => {
  try {
    const userId = req.user.id;
    const review = await Review.findOne({ userId });
    if (!review) return res.status(404).json({ message: 'No review found.' });
    res.json({ success: true, review });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// PATCH /user/reviews/ - Update own review
export const updateReview = async (req, res) => {
  try {
    const userId = req.user.id;
    const { status, review } = req.body;
    const reviewDoc = await Review.findOne({ userId });
    if (!reviewDoc) return res.status(404).json({ message: 'Review not found.' });
    if (status !== undefined) {
      if (!['happy', 'ordinary', 'sad'].includes(status)) {
        return res.status(400).json({ message: 'Status must be one of: happy, ordinary, sad.' });
      }
      reviewDoc.status = status;
    }
    if (review !== undefined) {
      if (!review || typeof review !== 'string') {
        return res.status(400).json({ message: 'Review is required.' });
      }
      reviewDoc.review = review;
    }
    await reviewDoc.save();
    res.json({ success: true, review: reviewDoc });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// DELETE /user/reviews/ - Delete own review
export const deleteReview = async (req, res) => {
  try {
    const userId = req.user.id;
    const review = await Review.findOneAndDelete({ userId });
    if (!review) return res.status(404).json({ message: 'Review not found.' });
    res.json({ success: true, message: 'Review deleted.' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}; 