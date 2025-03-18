import { JsonOutputParser } from '@langchain/core/output_parsers'
import { ChatPromptTemplate } from '@langchain/core/prompts'
import { llm } from './llm'
import type { ReadingMaterial,Video,VideoMaterial,Question,QuizContent,Quiz, Content } from '../src/types/contentResponse'
import { RunnableSequence } from '@langchain/core/runnables'

// Initialize the OpenAI model
const model = llm

// Set up the parser with the Content type
const parser = new JsonOutputParser<Content>()

// Define the prompt template
const plannerTemplate = `
## Context:
- lessons:{lessons}
- material:{material}

## Task:
    create a studying material for the lessons and the material provided and return it in the following json format, return the json and the json only>
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
export async function contentAnswer(lessons:string[], material:string) {
  const response = await chain.invoke({
    lessons,
    material
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
