import { body } from 'express-validator';

export const createAdminValidation = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required'),

  body('email')
    .isEmail().withMessage('Invalid email format'),

  body('password')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),

  body('isSuper')
    .optional()
    .isBoolean().withMessage('isSuper must be a boolean'),
];

export const updateAdminValidation = [
  body('name')
    .optional()
    .trim()
    .notEmpty().withMessage('Name cant be empty'),

  body('email')
    .optional()
    .isEmail().withMessage('Invalid email format'),

  body('password')
    .optional()
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),

  body('isSuper')
    .optional()
    .isBoolean().withMessage('isSuper must be a boolean'),
];
