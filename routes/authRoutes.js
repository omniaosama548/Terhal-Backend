import express from "express";
import { register, login } from "../controllers/authController.js";
import { validateInput } from "../middlewares/validateInput.js";
import { forgetPassword, resetPassword ,verifyEmail} from "../controllers/authController.js";
import { body } from "express-validator";

const router = express.Router();

router.post(
  "/register",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
    body("mobile").notEmpty().withMessage("Mobile is required"),
    body("nationality").notEmpty().withMessage("Nationality is required"),
    body("language").isIn(["AR", "EN"]).withMessage("Language must be AR or EN"),
  ],
  validateInput,
  register
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Valid email is required"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  validateInput,
  login
);
// Handle forget password
router.post(
  "/forgetPassword",
  [body("email").isEmail().withMessage("Valid email is required")],
  validateInput,
  forgetPassword
);
router.post("/verify-email/:token", verifyEmail);
// Handle reset password
router.post(
  "/resetPassword",
  [
    
       body("password").notEmpty().withMessage("Password is required"),
  ],
  validateInput,
  resetPassword
);  
export default router;

