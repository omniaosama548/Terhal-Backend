import express from 'express';
import {
  createReview,
  getAllReviews,
  getMyReview,
  updateReview,
  deleteReview
} from '../../controllers/user-controllers/review.controller.js';
import { authMiddleware } from '../../middlewares/authMiddleware.js';

const router = express.Router();

// Public: Get all reviews
router.get('/', getAllReviews);

// Authenticated: Create, get own, update, delete
router.post('/', authMiddleware, createReview);
router.get('/me', authMiddleware, getMyReview);
router.patch('/', authMiddleware, updateReview);
router.delete('/', authMiddleware, deleteReview);

export default router; 