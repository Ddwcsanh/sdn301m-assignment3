import { body } from 'express-validator'

export const validateUser = [
  body('username')
    .notEmpty()
    .withMessage('Username is required.')
    .isLength({ min: 3, max: 20 })
    .withMessage('Username must be between 3 to 20 characters long.')
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage('Username can only contain letters, numbers, and underscores.'),
  body('password')
    .notEmpty()
    .withMessage('Password is required.')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long.')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
    .withMessage(
      'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character.'
    ),
  body('name')
    .notEmpty()
    .withMessage('Name is required.')
    .isLength({ min: 3, max: 20 })
    .withMessage('Name must be between 3 to 20 characters long.'),
  body('yob')
    .notEmpty()
    .withMessage('Year of birth is required.')
    .isInt({ min: 1900, max: 2021 })
    .withMessage('Year of birth must be between 1900 to 2021.')
]

export const validateCategory = [body('name').notEmpty().withMessage('Username is required.')]

export const validateOrchid = [
  body('name')
    .notEmpty()
    .withMessage('Name is required.')
    .isLength({ min: 3, max: 200 })
    .withMessage('Name must be between 3 to 200 characters long.'),
  body('image').notEmpty().withMessage('Image is required.').isURL().withMessage('Image must be a URL'),
  body('isNatural')
    .notEmpty()
    .withMessage('isNatural is required.')
    .isBoolean()
    .withMessage('isNatural must be a boolean'),
  body('origin')
    .notEmpty()
    .withMessage('Origin is required.')
    .isLength({ min: 3, max: 20 })
    .withMessage('Origin must be between 3 to 20 characters long.'),
  body('category')
    .notEmpty()
    .withMessage('Category is required.')
    .isMongoId()
    .withMessage('Category must be a Mongo id.')
]

export const validateComment = [
  body('comment')
    .notEmpty()
    .withMessage('Comment is required.')
    .isLength({ max: 200 })
    .withMessage('Name must less than 200 characters long.')
]

export const validateUpdateUser = [
  body('username')
    .notEmpty()
    .withMessage('Username is required.')
    .isLength({ min: 3, max: 20 })
    .withMessage('Username must be between 3 to 20 characters long.')
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage('Username can only contain letters, numbers, and underscores.')
]

export const validateChangePassword = [
  body('password')
    .notEmpty()
    .withMessage('Password is required.')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long.')
]
