import express from 'express';
import {
  addAdmin,
  updateAdmin,
  deleteAdmin
} from '../controllers/AdminController.js';
import { createAdminValidation, updateAdminValidation } from '../validations/adminValidations.js';
import { validateInput } from '../middlewares/validateInput.js';
import { isAdmin } from '../middlewares/isAdmin.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

//import admin middleware
const adminRouter=express.Router();
adminRouter.use(authMiddleware);

adminRouter.post('/',createAdminValidation,validateInput,isAdmin,addAdmin);
adminRouter.put('/:id',updateAdminValidation,validateInput,isAdmin,updateAdmin);
adminRouter.delete('/:id',isAdmin,deleteAdmin); //any admin can delete ,but suberadmin cant be deleted
export default adminRouter;