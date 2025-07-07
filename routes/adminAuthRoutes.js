import express from 'express';
import { body } from 'express-validator'; 
import { validateInput } from '../middlewares/validateInput.js';
import { login } from '../controllers/AdminAuthController.js';

const adminAuthRouter = express.Router();

adminAuthRouter.post('/login', [
  body("email").isEmail().withMessage("Valid email is required"),
  body("password").notEmpty().withMessage("Password is required"),
], validateInput, login);

export default adminAuthRouter;
