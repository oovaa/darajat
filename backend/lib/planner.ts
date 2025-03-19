import { llm } from './llm'
import { RunnableSequence } from '@langchain/core/runnables'
import { syllabus } from './syllabus'
// Initialize the OpenAI model
const model = llm

// Function to generate the prompt template string
function generatePrompt(hoursPerDay: any, lastYear: any, yearsMissed: any) {
  return `## Context:
  -date:${Date.now()}
  - Hours per day available: ${hoursPerDay}
  - Last year completed in education: ${lastYear}
  - Years missed: ${yearsMissed}
  - syllabus:${syllabus} this is an array that contains the years and subjects that the user may study, you can know what to select from this list with
    the last year and the years missed for example if the last year studied is 10 and the years missed are 2 you must select the years 11 and 12 and so on so forth 

  ## Task:
  Create a structured study plan covering the above subjects, considering the user's background. The plan must be formatted as valid JSON and follow this schema:
  
  ## USE THE CURRENT DATE TO REPRESENT MONTHS AND DAYS today is march 2025

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
      generatePrompt(input.hoursPerDay, input.lastYear, input.yearsMissed),
    model,
  ])
  return chain
}

// Function to invoke the chain
export async function plannerAnswer(
  hoursPerDay: number,
  lastYear: number,
  yearsMissed: number
) {
  const chain = await createChain()
  const response = await chain.invoke({
    hoursPerDay,
    lastYear,
    yearsMissed,
  })

  return JSON.parse(response.content)
}

// Example usage
async function main() {
  const hoursPerDay = 4
  const lastYear = 10
  const yearsMissed = 2

  const studyPlan = await plannerAnswer(
    hoursPerDay,
    lastYear,
    yearsMissed
  )
  console.log(studyPlan)
}

// Run the example
main().catch((error) => {
  console.error('Error during test execution:', error)
})
