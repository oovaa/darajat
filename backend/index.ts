import express, { json } from 'express'
import cors from 'cors'
import { requestLoggerMilddleware } from './src/middleware/loggerMiddleware'
import { router } from './src/routes'
import helmet from 'helmet'

const app = express()

app.use(json())
app.use(cors())
app.use(requestLoggerMilddleware)
app.use(helmet())

app.use('/api', router)

const port = process.env.PORT || 3000
app.get('/z', (req, res) => {
  res.status(200).send({ status: 'ok' })
})

app.listen(port, () => console.log(`app is listening on ${port}`))
