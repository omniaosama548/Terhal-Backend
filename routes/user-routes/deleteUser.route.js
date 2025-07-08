// routes/userRoutes.js
import express from 'express';
import { deleteUserAccount, reactivateUserAccount } from '../../controllers/user-controllers/deleteUser.controller.js';
import { authMiddleware } from '../../middlewares/authMiddleware.js';

const router = express.Router();

router.delete('/delete', authMiddleware, deleteUserAccount);
router.post('/reactivate', authMiddleware, reactivateUserAccount);

export default router;
