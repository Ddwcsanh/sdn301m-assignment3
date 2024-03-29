import express from 'express'
import { validateUser } from '~/common/validator'
import authController from '~/controller/auth.controller'
import publicController from '~/controller/public.controller'

const publicRouter = express.Router()

publicRouter.post('/login', authController.login)
publicRouter.route('/register').post(validateUser, authController.register)
publicRouter
publicRouter
  .get('/', publicController.getAllOrchids)
  .get('/search', publicController.searchOrchid)
  .get('/:orchidSlug', publicController.getOrchid)
export default publicRouter
