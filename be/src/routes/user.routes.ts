import express from 'express'
import { validateChangePassword, validateUser } from '~/common/validator'
import userController from '~/controller/user.controller'
import { authorizationAdmin } from '~/middleware/auth'

const userRouter = express.Router()
userRouter.use(authorizationAdmin).route('/me').get(userController.getUser)
userRouter
  .use(authorizationAdmin)
  .route('/')
  .get(userController.getAllUsers)
  .post(validateUser, userController.createUser)
userRouter.use(authorizationAdmin).post('/logout', userController.logout)
userRouter.use(authorizationAdmin).route('/password-change').put(validateChangePassword, userController.changePassword)

export default userRouter
