import { body } from 'express-validator';

export const createCategoryValidation = [
    body('title')
        .notEmpty().withMessage('name is required')
        .isString().withMessage('name must be string'),
];

export const updateCategoryValidation = [
    body('title')
        .notEmpty().withMessage('name is required')
        .isString().withMessage('name must be string'),
];
