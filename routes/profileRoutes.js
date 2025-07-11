import express from 'express';
import { getUser, updateUser } from '../controllers/profileController.js';
import { protect } from '../middlewares/protectMiddleware.js'
import { upload } from '../middlewares/upload.js'
const router = express.Router();
// Get user profile
router.get('/me', protect, getUser);
// Update user profile
router.put('/update', protect, upload.single('image'), updateUser );
export default router;