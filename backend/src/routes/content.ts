import { Router } from 'express'
import { contentAnswer } from '../../lib/contentGenerator'

export const contentRouter = Router()

contentRouter.post('/generate-content', async (req, res) => {
  try {
    let data = ''

    const { lessons } = req.body
    lessons.array.forEach((element: string) => {
      data += element
    })
    const material = await postData(data)

    contentAnswer(lessons, material)
    if (lessons.length === 0) {
      return res
        .status(400)
        .json({ error: 'lessons must be a non-empty array' })
    }
    if (material === undefined) {
      return res.status(400).json({ error: 'Material is not defined' })
    }
    return res.status(200).json({ answer: contentAnswer(lessons, material) })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Failed to generate content' })
  }
})
