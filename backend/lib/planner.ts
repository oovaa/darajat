import { PromptTemplate } from '@langchain/core/prompts'
import { RunnableSequence } from '@langchain/core/runnables'
import { llm } from './llm'

// Updated template with escaped curly braces for JSON example
const plannerTemplate = `
## Context:
- Hours per day available: {hoursPerDay}
- Subjects to cover: {titles}
- Last year completed in education: {lastYear}
- Years missed: {yearsMissed}

## Task:
Create a detailed study plan to cover all the listed subjects within the available time frame, considering the user's educational background and the years they've missed. The plan must be formatted as a valid JSON object with the following structure:

{{
  "weeks": number,
  "weeklySchedule": [
    {{
      "week": number,
      "subjects": [string],
      "hours": number
    }}
  ],
  "hoursPerDay": number,
  "totalHours": number,
  "additionalNotes": string
}}

## Response format
respond in a valid JSON format only, nothing else

## Response:
`

const plannerPrompt = PromptTemplate.fromTemplate(plannerTemplate)

const chain = RunnableSequence.from([plannerPrompt, llm])

export async function plannerAnswer(
  hoursPerDay: number,
  titles: string[],
  lastYear: number,
  yearsMissed: number
) {
  const response = await chain.invoke({
    hoursPerDay,
    titles: titles.join(', '),
    lastYear,
    yearsMissed,
  })
  return { answer: response.content }
}

async function main() {
  // Define test inputs
  const hoursPerDay = 4 // Hours available per day for studying
  const titles = [
    'Mathematics',
    'Physics',
    'Chemistry',
    'Biology',
    'History',
    'Geography',
    'Literature',
    'Computer Science',
    'Economics',
    'Art',
    'Music',
    'Physical Education',
    'Philosophy',
    'Psychology',
    'Sociology',
    'Foreign Language',
    'Political Science',
    'Environmental Science',
    'Statistics',
    'Calculus',
  ] // A large list of subjects to study
  const lastYear = 10 // Last year completed in education
  const yearsMissed = 2 // Years missed in education

  // Call the plannerAnswer function
  const result = await plannerAnswer(hoursPerDay, titles, lastYear, yearsMissed)

  // Log the result
  console.log('Generated Study Plan:')
  console.log(result.answer)
}

// Run the test
main().catch((error) => {
  console.error('Error during test execution:', error)
})
