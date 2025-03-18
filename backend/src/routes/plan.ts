import { Router } from 'express'
import { plannerAnswer } from '../../lib/planner'

export const planRouter = Router()

planRouter.post('/plan', async (req, res) => {
  // Extract and validate input data
  const { hoursPerDay, titles, lastYear, yearsMissed } = req.body

  // Validate required fields
  if (
    hoursPerDay === undefined ||
    !titles ||
    lastYear === undefined ||
    yearsMissed === undefined
  ) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  // Validate data types
  if (
    typeof hoursPerDay !== 'number' ||
    !Array.isArray(titles) ||
    typeof lastYear !== 'number' ||
    typeof yearsMissed !== 'number'
  ) {
    return res.status(400).json({ error: 'Invalid data types' })
  }

  // Validate hoursPerDay is a positive number
  if (hoursPerDay <= 0) {
    return res
      .status(400)
      .json({ error: 'hoursPerDay must be a positive number' })
  }

  // Validate titles is a non-empty array
  if (titles.length === 0) {
    return res.status(400).json({ error: 'titles must be a non-empty array' })
  }

  try {
    // Call the planner function
    const result = await plannerAnswer(
      hoursPerDay,
      titles,
      lastYear,
      yearsMissed
    )

    // Parse the AI's response (which is a string) into a JSON object
    const parsedAnswer = result.answer

    // Return the parsed JSON object
    res.status(200).json({ answer: parsedAnswer })
  } catch (error) {
    console.error('Error generating study plan:', error)

    // Handle specific errors
    if (error instanceof SyntaxError) {
      return res
        .status(500)
        .json({ error: 'Invalid JSON response from the planner' })
    }

    // Generic error response
    res
      .status(500)
      .json({ error: 'Failed to generate study plan', details: error.message })
  }
})
