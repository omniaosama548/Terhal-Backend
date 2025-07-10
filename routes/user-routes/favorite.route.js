import express from 'express';
import { getUserFavoritePlaces, updateUserLocation } from '../../controllers/user-controllers/favourite.controller.js';
import { authMiddleware } from '../../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/favorite', authMiddleware, getUserFavoritePlaces);

// Route to update user's last known location
router.patch('/location', authMiddleware, updateUserLocation);

export default router;
