import express, { Request, Response, urlencoded } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import passport from 'passport'
import path from 'path'
import * as http from 'http'
import * as bodyParser from 'body-parser'
import morgan from 'morgan'
import dbConnect from './utils/db.connect'
import publicRouter from './routes/public.routes'
import userRouter from './routes/user.routes'
import memberRouter from './routes/member.routes'
import orchidRouter from './routes/orchid.routes'
import categoryRouter from './routes/category.routes'
import commentRouter from './routes/comment.routes'
import httpStatus from 'http-status'

const app = express()

//env
dotenv.config()
const httpPort = process.env.HTTP_PORT
const env = process.env.NODE_ENV
const dbUrl = process.env.MONGO_DB_URL

//#region auth
app.use(passport.initialize())

//#region config
app.use(cors())
app.use(express.static(path.join(__dirname + '/public')))
app.use(
  urlencoded({
    extended: true
  })
)
app.use(bodyParser.json())
if (env === 'DEV') {
  app.use(morgan('dev'))
}

//#region database
dbConnect(dbUrl)

//#region app endpoints
app.use('/public', publicRouter)
app.use('/accounts', passport.authenticate('jwt', { session: false }), userRouter)
app.use('/member', passport.authenticate('jwt', { session: false }), memberRouter)
app.use('/orchid', passport.authenticate('jwt', { session: false }), orchidRouter)
app.use('/categories', passport.authenticate('jwt', { session: false }), categoryRouter)
app.use('/comment', passport.authenticate('jwt', { session: false }), commentRouter)

app.get('*', (req: Request, res: Response) => {
  res.status(httpStatus.NOT_FOUND).json({
    message: 'Not found'
  })
})

//#region create server
const httpServer = http.createServer(app)
httpServer.listen(httpPort, () => {
  console.log(`[💡] App listening on http://localhost:${httpPort}`)
})

export default app
