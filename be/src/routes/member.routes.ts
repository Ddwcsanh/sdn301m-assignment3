import express from 'express'
import { validateChangePassword, validateUpdateUser } from '~/common/validator'
import userController from '~/controller/user.controller'
import { authorizationMember } from '~/middleware/auth'

const memberRouter = express.Router()
memberRouter.use(authorizationMember).route('/me').get(userController.getUser)
memberRouter.use(authorizationMember).route('/update').put(validateUpdateUser, userController.updateUser)
memberRouter.use(authorizationMember).post('/logout', userController.logout)
memberRouter
  .use(authorizationMember)
  .route('/password-change')
  .put(validateChangePassword, userController.changePassword)

export default memberRouter
