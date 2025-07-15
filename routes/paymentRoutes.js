import express from 'express';
import {
  handleCheckout,
  handleSuccess,
  handleCancel,
} from '../controllers/paymentController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Protect checkout route to allow only logged-in users
router.post('/checkout',authMiddleware, handleCheckout); // create Stripe session

// Payment success and cancel routes usually don't require auth
router.get('/success', handleSuccess);    // called after successful payment
router.get('/cancel', handleCancel);      // called after payment cancel

export default router;
