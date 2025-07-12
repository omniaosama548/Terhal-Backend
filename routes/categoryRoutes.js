import express from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { validateInput } from '../middlewares/validateInput.js';
import { isAdmin } from '../middlewares/isAdmin.js';
import { createCategoryValidation, updateCategoryValidation } from '../validations/categoryValidation.js';
import { createCategory, deleteCategory, getAllCategories, getCategoryById, updateCategory } from '../controllers/CategoryController.js';
const categoryRouter=express.Router();

categoryRouter.use(authMiddleware);
categoryRouter.get('/',getAllCategories);
categoryRouter.get('/:id',getCategoryById);
//admin routs user not allowed here 
categoryRouter.post('/',createCategoryValidation,validateInput,isAdmin,createCategory);
categoryRouter.put('/:id',updateCategoryValidation,validateInput,isAdmin,updateCategory);  // cant be updatesd if contains places
categoryRouter.delete('/:id',isAdmin,deleteCategory); // category cant be deleted if it has paces
export default categoryRouter;