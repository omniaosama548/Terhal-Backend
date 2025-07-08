import express from 'express';
import { viewUserHistory } from '../../controllers/user-controllers/history.controller.js';
import { authMiddleware } from '../../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/history', authMiddleware, viewUserHistory);

export default router;
