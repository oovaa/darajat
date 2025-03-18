import { JsonOutputParser } from '@langchain/core/output_parsers'
import { ChatPromptTemplate } from '@langchain/core/prompts'
import { llm } from './llm'
import type {
  ReadingMaterial,
  Video,
  VideoMaterial,
  Question,
  QuizContent,
  Quiz,
  Content,
} from '../src/types/contentResponse'
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
export async function contentAnswer(lessons: string[], material: string) {
  const response = await chain.invoke({
    lessons,
    material,
  })

  console.log(response)
  return response
}

// Example test in main
// async function main() {
//   const fakeLessons = ['Algebra', 'Trigonometry', 'Calculus']
//   const fakeMaterial =
//     'Comprehensive notes, practice problems, and video explanations.'

//   const studyContent = await contentAnswer(fakeLessons, fakeMaterial)
//   console.log('Generated Study Content:', JSON.stringify(studyContent, null, 2))
// }

// main()
