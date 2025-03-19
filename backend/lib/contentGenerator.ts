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


// Define the prompt template
function generatePrompt(lessons:string[],material:string) {
const genContentTemplate = `
## Context:
- lessons:${lessons}
- material:${material}
- 


## Task:
  create a studying material for the lessons and the material provided and return it in the following json format, return the json and the json only
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
          "title": "Reading - Functions - Chapter 2",
          "content": "URL or text content here"
        },
        {
          "type": "video",
          "content": [
            {
              "title": "Understanding Kinematics",
              "url": "https://example.com/video-kinematics"
            }
          ]
        },
        {
          "type": "questions",
          "content": {
            "type": "mcqs",
            "questions": [
              {
                "question": "What is the formula for velocity?",
                "options": [
                  "v = d/t",
                  "v = t/d",
                  "v = d × t"
                ],
                "answer": 0
              },
              {
                "question": "Which of the following is a vector quantity?",
                "options": [
                  "Speed",
                  "Velocity",
                  "Distance"
                ],
                "answer": 1
              }
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
## schema explanation :
      'date': The current date of study.

    'content': A list of subjects and their corresponding study materials for the day.

        'subject': The name of the subject (e.g., 'Physics').

        'title': The specific topic covered under the subject (e.g., 'Kinematics').

        'material': A list of different types of materials associated with the subject and topic.

            'type': The type of material (e.g., 'read', 'video', 'questions').

            'content': The actual material, which varies depending on the type.

                'video.content':

                    'title': The title of the video.

                    'url': The URL to access the video.

                'questions.content':

                    'type': The type of question (e.g., 'mcq').

                    'question': The actual question text.

                    'options': A list of possible answers for the question.

                    'answer': The index of the correct option in the list of options.

## Response format:
Respond in a valid JSON format only, nothing else.
## Response:
`
return genContentTemplate
}

// Create the chain
const chain = RunnableSequence.from([
    async (input) =>
      generatePrompt(input.lessons, input.material),
    model,
  ])
// Function to invoke the chain
export async function contentAnswer(lessons: string[], material: string) {
  const response = await chain.invoke({
    lessons,
    material,
  })

  console.log(response)
  return response.content
}

// Example test in main
// async function main() {
//   const fakeLessons = ['Algebra', 'Trigonometry', 'Calculus']
//   const fakeMaterial =
//     'Comprehensive notes, practice problems, and video explanations.'

//   const studyContent = await contentAnswer(fakeLessons, fakeMaterial)
//   console.log(studyContent)
// }

// main()
