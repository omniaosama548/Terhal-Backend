// routes/adminStatsRoutes.js
import express from 'express';
import {
  getOverviewStats,
  getNationalitiesStats,
  getTopRatedPlaces,
  getReviewsAnalysis
} from '../controllers/adminStats.controller.js';
import { isAdmin } from '../middlewares/isAdmin.js';
import { authMiddleware } from './../middlewares/authMiddleware.js';




const router = express.Router();
router.use(authMiddleware);
router.get('/overview', isAdmin, getOverviewStats);
router.get('/nationalities', isAdmin, getNationalitiesStats);
router.get('/top-rated', isAdmin, getTopRatedPlaces);
router.get('/reviews-analysis', isAdmin, getReviewsAnalysis);
export default router;
