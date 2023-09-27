import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import { config } from './configs/config.js'
import { connection } from './configs/connection.js'
import { userRoute } from './routes/user.route.js'
import { taskRoute } from './routes/task.route.js'

const app = express()

app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: 'true' }))
// Habilitar CORS para todas las rutas
connection()

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))

app.use('/api/u/tasks', taskRoute)
app.use('/api/u', userRoute)

app.listen(config.port, function () {
  console.log(`Server on ${config.port}`)
})
