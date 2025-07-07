import express from 'express';
import {
  addAdmin,
  updateAdmin,
  deleteAdmin
} from '../controllers/AdminController.js';
import { createAdminValidation, updateAdminValidation } from '../validations/adminValidations.js';
import { validateInput } from '../middlewares/validateInput.js';

//import admin middleware
const adminRouter=express.Router();

adminRouter.post('/',createAdminValidation,validateInput,addAdmin);
adminRouter.put('/:id',updateAdminValidation,validateInput,updateAdmin);
adminRouter.delete('/:id',deleteAdmin);
export default adminRouter;