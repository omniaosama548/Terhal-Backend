// routes/adminStatsRoutes.js
import express from 'express';
import {
  getOverviewStats,
  getNationalitiesStats,
  getTopRatedPlaces,
  getReviewsAnalysis
} from '../controllers/adminStats.controller.js';
import { protectAdmin } from '../middlewares/protectAdmin.js';
import { isAdmin } from '../middlewares/isAdmin.js';




const router = express.Router();

router.get('/overview', protectAdmin, isAdmin, getOverviewStats);
router.get('/nationalities', protectAdmin, isAdmin, getNationalitiesStats);
router.get('/top-rated', protectAdmin, isAdmin, getTopRatedPlaces);
router.get('/reviews-analysis', protectAdmin, isAdmin, getReviewsAnalysis);
export default router;
