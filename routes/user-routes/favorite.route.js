// routes/userRoutes.js
import express from 'express';
import { getUserFavoritePlaces } from '../../controllers/user-controllers/favourite.controller.js';
import { authMiddleware } from '../../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/favorite', authMiddleware, getUserFavoritePlaces);

export default router;
