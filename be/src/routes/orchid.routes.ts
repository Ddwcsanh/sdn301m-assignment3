import express from 'express'
import { validateOrchid } from '~/common/validator'
import orchidController from '~/controller/orchid.controller'
import { authorizationAdmin } from '~/middleware/auth'

const orchidRouter = express.Router()
orchidRouter
  .use(authorizationAdmin)
  .route('/')
  .get(orchidController.getAllOrchids)
  .post(validateOrchid, orchidController.createOrchid)
orchidRouter
  .use(authorizationAdmin)
  .route('/:orchidId')
  .get(orchidController.getOrchid)
  .put(validateOrchid, orchidController.updateOrchid)
  .delete(orchidController.deleteOrchid)

export default orchidRouter
