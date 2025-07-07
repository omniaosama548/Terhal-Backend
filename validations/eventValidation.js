import { body } from 'express-validator';

export const createEventValidation = [
  body('name')
    .notEmpty().withMessage('name is required')
    .isString().withMessage('name must be string'),

  body('description')
    .optional()
    .isString().withMessage('description must be string'),

  body('location')
    .notEmpty().withMessage('location is required')
    .isString().withMessage('location must be string'),

  body('address')
    .notEmpty().withMessage('address is required')
    .isString().withMessage('address must be string'),

  body('category')
    .notEmpty().withMessage('category is required')
    .isString().withMessage('category must be string'),

  body('coordinates')
    .notEmpty().withMessage('coordinates required')
    .isString().withMessage('coordinates must be string'),

  body('startTime')
    .notEmpty().withMessage('start time is required')
    .isString().withMessage('start time must be string'),

  body('endTime')
    .notEmpty().withMessage('end time is required')
    .isString().withMessage('end time must be string'),
];

export const updateEventValidation = [
  body('name')
    .optional()
    .isString().withMessage('name must be string'),

  body('description')
    .optional()
    .isString().withMessage('description must be string'),

  body('location')
    .optional()
    .isString().withMessage('location must be string'),

  body('address')
    .optional()
    .isString().withMessage('address must be string'),

  body('category')
    .optional()
    .isString().withMessage('category must be string'),

  body('coordinates')
    .optional()
    .isString().withMessage('coordinates must be string'),

  body('startTime')
    .optional()
    .isString().withMessage('start time must be string'),

  body('endTime')
    .optional()
    .isString().withMessage('end time must be string'),
];
