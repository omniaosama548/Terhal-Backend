import Review from '../../models/Review.js';

// POST /user/reviews - Create a review (one per user)
export const createReview = async (req, res) => {
  try {
    const userId = req.user.id;
    const { rating, comment } = req.body;
    if (typeof rating !== 'number' || rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating must be a number between 1 and 5.' });
    }
    if (!comment || typeof comment !== 'string') {
      return res.status(400).json({ message: 'Comment is required.' });
    }
    // Only one review per user
    const existing = await Review.findOne({ user: userId });
    if (existing) {
      return res.status(400).json({ message: 'You have already submitted a review.' });
    }
    const review = await Review.create({ user: userId, rating, comment });
    res.status(201).json({ success: true, review });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// GET /user/reviews - Get all reviews
export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find().populate('user', 'name email');
    res.json({ success: true, reviews });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// GET /user/reviews/me - Get current user's review
export const getMyReview = async (req, res) => {
  try {
    const userId = req.user.id;
    const review = await Review.findOne({ user: userId });
    if (!review) return res.status(404).json({ message: 'No review found.' });
    res.json({ success: true, review });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// PATCH /user/reviews/:id - Update own review
export const updateReview = async (req, res) => {
  try {
    const userId = req.user.id;
    // const { id } = req.params;
    const { rating, comment } = req.body;
    const review = await Review.findOne({  user: userId });
    if (!review) return res.status(404).json({ message: 'Review not found.' });
    if (rating !== undefined) {
      if (typeof rating !== 'number' || rating < 1 || rating > 5) {
        return res.status(400).json({ message: 'Rating must be a number between 1 and 5.' });
      }
      review.rating = rating;
    }
    if (comment !== undefined) {
      if (!comment || typeof comment !== 'string') {
        return res.status(400).json({ message: 'Comment is required.' });
      }
      review.comment = comment;
    }
    await review.save();
    res.json({ success: true, review });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// DELETE /user/reviews/:id - Delete own review
export const deleteReview = async (req, res) => {
  try {
    const userId = req.user.id;
    // const { id } = req.params;
    const review = await Review.findOneAndDelete({  user: userId });
    if (!review) return res.status(404).json({ message: 'Review not found.' });
    res.json({ success: true, message: 'Review deleted.' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}; 