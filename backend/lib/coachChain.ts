import { PromptTemplate } from '@langchain/core/prompts'
import { RunnableSequence } from '@langchain/core/runnables'
import { llm } from './llm'

const coach = `
## Context:
{information}

## Question:
{question}

## Task:
Answer the provided question based on the given information

## Response:
`

const coach_prompt = PromptTemplate.fromTemplate(coach)

const chain = RunnableSequence.from([coach_prompt, llm])

export async function coachAnswer(information: string, question: string) {
  const response = await chain.invoke({
    information,
    question,
  })
  return { answer: response.content }
}

// ;(async () => {
//   const fakeInformation = `
//     The first law of thermodynamics states that energy cannot be created or destroyed, only transferred or converted from one form to another.
//     In a closed system, the total energy remains constant.
//     This principle is fundamental in physics and engineering applications.
//   `

//   const hiddenQuestion =
//     'How does the first law of thermodynamics apply to closed systems?'

//   const result = await coachAnswer(fakeInformation, hiddenQuestion)
//   console.log(result)
// })()
