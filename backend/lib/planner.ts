import { JsonOutputParser } from '@langchain/core/output_parsers'
import { ChatPromptTemplate } from '@langchain/core/prompts'
import { llm } from './llm'
import type { StudyPlan } from '../src/types/plannerResponse'
import { RunnableSequence } from '@langchain/core/runnables'

// Initialize the OpenAI model
const model = llm

// Set up the parser with the StudyPlan type
const parser = new JsonOutputParser<StudyPlan>()

// Function to generate the prompt template string
function generatePrompt(
  hoursPerDay: any,
  titles: any,
  lastYear: any,
  yearsMissed: any
) {
  return `## Context:
  - Hours per day available: ${hoursPerDay}
  - Subjects to cover: ${titles}
  - Last year completed in education: ${lastYear}
  - Years missed: ${yearsMissed}

  ## Task:
  Create a structured study plan covering the above subjects, considering the user's background. The plan must be formatted as valid JSON and follow this schema:

  {
    "plan": [
      {
        "month": <number>,
        "title": "<string>",
        "focus": "<string>",
        "subjects_covered": ["<string>", "<string>"],
        "goal": "<string>",
        "weeks": [
          {
            "days": "<date from Monday–Friday>",
            "content": {
              "<subject>": ["<topic1>", "<topic2>"]
            },
            "daily_focus": [
              {
                "date": "<string>",
                "day": "<string>",
                "subjects": {
                  "<subject>?": ["<topic1>", "<topic2>"]
                }
              }
            ]
          }
        ]
      }
    ]
  }

  ## Response format:
  Respond in valid JSON only, nothing else.

  ## Response:`
}

// Function to create the chain
async function createChain() {
  // const formatInstructions = parser.getFormatInstructions()
  // const prompt = ChatPromptTemplate.fromTemplate('') // Empty template to use with string literals
  const chain = RunnableSequence.from([
    async (input) =>
      generatePrompt(
        input.hoursPerDay,
        input.titles,
        input.lastYear,
        input.yearsMissed
      ),
    model,
    parser,
  ])
  return chain
}

// Function to invoke the chain
export async function plannerAnswer(
  hoursPerDay: number,
  titles: any[],
  lastYear: number,
  yearsMissed: number
) {
  const chain = await createChain()
  const response = await chain.invoke({
    hoursPerDay,
    titles: titles.join(', '),
    lastYear,
    yearsMissed,
  })
  return response
}

// // Example usage
// async function main() {
//   const hoursPerDay = 4
//   const titles = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'History']
//   const lastYear = 10
//   const yearsMissed = 2

//   const studyPlan = await plannerAnswer(
//     hoursPerDay,
//     titles,
//     lastYear,
//     yearsMissed
//   )
//   console.log(JSON.stringify(studyPlan, null, 2))
// }

// // Run the example
// main().catch((error) => {
//   console.error('Error during test execution:', error)
// })
