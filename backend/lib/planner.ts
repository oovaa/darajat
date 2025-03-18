import { JsonOutputParser } from '@langchain/core/output_parsers'
import { ChatPromptTemplate } from '@langchain/core/prompts'
import { llm } from './llm'
import type { StudyPlan } from '../src/types/plannerResponse'
import { RunnableSequence } from '@langchain/core/runnables'

// Initialize the OpenAI model
const model = llm

// Set up the parser with the StudyPlan type
const parser = new JsonOutputParser<StudyPlan>()

// Define the prompt template
const plannerTemplate = `
## Context:
- Hours per day available: {hoursPerDay}
- Subjects to cover: {titles}
- Last year completed in education: {lastYear}
- Years missed: {yearsMissed}

## Task:
Create a detailed study plan to cover all the listed subjects within the available time frame, considering the user's educational background and the years they've missed. The plan must be formatted as a valid JSON object

{format_instructions}

## Response format:
Respond in a valid JSON format only, nothing else.

## Response:
`

// Create the prompt template
const prompt = ChatPromptTemplate.fromTemplate(plannerTemplate)

// Add format instructions to the prompt
const formatInstructions = parser.getFormatInstructions()

const partialedPrompt = await prompt.partial({
  format_instructions: formatInstructions,
})

// Create the chain
const chain = RunnableSequence.from([
  partialedPrompt,

  model,
  parser,
  // (prevResult) => console.log(prevResult),
])

// Function to invoke the chain
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

  console.log(response)

  return response
}

// // Example usage
// async function main() {
//   const hoursPerDay = 4
//   const titles = ['Mathematics', 'Physics', 'Chemistry']
//   const lastYear = 10
//   const yearsMissed = 2

//   const studyPlan = await plannerAnswer(
//     hoursPerDay,
//     titles,
//     lastYear,
//     yearsMissed
//   )
//   console.log('Generated Study Plan:', JSON.stringify(studyPlan, null, 2))
// }

// // Run the example
// main().catch((error) => {
//   console.error('Error during test execution:', error)
// })
