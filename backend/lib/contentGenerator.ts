import { JsonOutputParser } from '@langchain/core/output_parsers'
import { ChatPromptTemplate } from '@langchain/core/prompts'
import { llm } from './llm'
import { search } from './material'
import { RunnableSequence } from '@langchain/core/runnables'

// Initialize the OpenAI model
const model = llm

// Define the prompt template
function generatePrompt(lessons: string[], material: string) {
  const genContentTemplate = `
## Context:
- lessons:${lessons}
- material:${material}

## Task:
  create a studying material for the lessons and the material provided and return it in the following json format
  make sure the right answers of the quiz is in a random index in the array of answer, this is a must
  schema example:{
  "date": "2025-03-16",
  "content": [
    {
      "subject": "Physics",
      "title": "Kinematics",
      "material": [
        {
          "type": "read",
          "title": "the title of the reading material",
          "content": "summarize the material above in 200-300 words"
        },
        {
          "type": "video",
          "content": [
            {
              "title": "the title of the video IT MUST BE A YOUTUBE VIDEO",
              "url": "the url of the video"
            }
          ]
        },
        {
          "type": "questions",
          "content": {
            "type": "mcqs",
            "questions": [
              {
                "question": "question about the material",
                "options": ["option 1", "option 2", "option 3","option 4"],
                "answer": random number 0-3 represents the answer
              },
            ]
          }
        }
      ]
    },
    {
      "subject": "Mathematics",
      "title": "Functions",
      "material": [
        {
          "type": "read",
          "title": "Introduction to Functions",
          "content": "URL or text content here"
        },
        {
          "type": "video",
          "content": [
            {
              "title": "Functions and Their Graphs",
              "url": "https://example.com/video-functions"
            }
          ]
        },
        {
          "type": "questions",
          "content": {
            "type": "mcqs",
            "questions": [
              {
                "question": "What is the domain of f(x) = 1/x?",
                "options": [
                  "All real numbers",
                  "All real numbers except 0",
                  "Only positive numbers"
                ],
                "answer": 1
              }
            ]
          }
        }
      ]
    }
  ]
}
## Response format:
Respond in a valid JSON format only, nothing else.
## Response:
`
  return genContentTemplate
}

// Create the chain
const chain = RunnableSequence.from([
  async (input) => generatePrompt(input.lessons, input.material),
  model,
])
// Function to invoke the chain
export async function contentAnswer(lessons: string[], material: string) {
  const response = await chain.invoke({
    lessons,
    material,
  })

  return response.content
}

// Example test in main
async function main() {
  const fakeLessons = ['Algebra', 'Trigonometry', 'Calculus']
  let lessons = ''
  for(let i=0;i<fakeLessons.length;i++){
    lessons += fakeLessons[i]
  }
  const fakeMaterial = await search(lessons)

  const studyContent = await contentAnswer(fakeLessons, fakeMaterial)
  console.log(studyContent)
}

main()
