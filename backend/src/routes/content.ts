import { Router } from 'express'
import { contentAnswer } from '../../lib/contentGenerator'
import { search } from '../../lib/search'

export const contentRouter = Router()

contentRouter.post('/generate-content', async (req, res) => {
  try {
    const { lessons } = req.body

    // Validate if lessons is a non-empty array
    if (!Array.isArray(lessons) || lessons.length === 0) {
      return res
        .status(400)
        .json({ error: 'lessons must be a non-empty array' })
    }

    // Combine lessons into a single string for searching
    const data = lessons.join(' ')

    // Fetch material based on the combined lessons
    const material = await search(data)

    // Validate if material is defined
    if (!material) {
      return res.status(400).json({ error: 'Material is not defined' })
    }

    // Generate content using the lessons and material
    const answer = await contentAnswer(lessons, material)

    // Return the generated content
    return res.status(200).json({answer})
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Failed to generate content' })
  }
})
