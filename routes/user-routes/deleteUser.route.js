// routes/userRoutes.js
import express from 'express';
import { deleteUserAccount, hardDeleteUserAccount, reactivateUserAccount } from '../../controllers/user-controllers/deleteUser.controller.js';
import { authMiddleware } from '../../middlewares/authMiddleware.js';

const router = express.Router();

router.delete('/soft-delete', authMiddleware, deleteUserAccount);
router.post('/reactivate-account', authMiddleware, reactivateUserAccount);
router.delete('/hard-delete', authMiddleware, hardDeleteUserAccount); 
export default router;
