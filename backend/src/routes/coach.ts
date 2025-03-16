import { Router, type Request, type Response } from 'express'
import { coachAnswer } from '../../lib/coachChain'

export const coachRouter = Router()

//
coachRouter.post('/coach', async (req: Request, res: Response) => {
  try {
    if (!req.body.information || !req.body.question) {
      return res.status(400).send({
        error: 'You need to pass both the information and the question',
      })
    }
    const { information, question } = req.body
    const response = await coachAnswer(information, question)
    res.status(200).send(response)
  } catch (error) {
    console.error(error)
    res.status(500).send({ error: 'Error processing request' })
  }
})
