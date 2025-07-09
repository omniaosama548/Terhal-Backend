import express from 'express';
import { chatWithAssistant } from '../controllers/AssestantController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const assestantRouter = express.Router();
assestantRouter.use(authMiddleware)
assestantRouter.post('/plan-trip', chatWithAssistant);

export default assestantRouter;
