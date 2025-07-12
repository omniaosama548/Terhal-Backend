import { body } from 'express-validator';


//  Validation rules for creating a place
export const createPlaceValidation = [
  body('name').notEmpty().withMessage('Place name is required'),
  body('location').notEmpty().withMessage('Location is required'),
  body('address').notEmpty().withMessage('Address is required'),
  body('category').notEmpty().withMessage('Category is required'),
  body('coordinates').notEmpty().withMessage('Coordinates are required'),
  // Optional fields:
  body('description').optional().isString(),
  body('image').optional().isString(),
];


//   Validation rules for updating a place
//   (Only checking if fields exist when sent)

export const updatePlaceValidation = [
  body('name').optional().isString(),
  body('description').optional().isString(),
  body('location').optional().isString(),
  body('address').optional().isString(),
  body('category').optional().isString(),
  body('coordinates').optional().isString(),
  body('image').optional().isString(),
];
