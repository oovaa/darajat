import { ChatGoogleGenerativeAI } from '@langchain/google-genai'

export const llm = new ChatGoogleGenerativeAI({
  model: 'gemini-1.5-pro',
  temperature: 0.3,
  json: true,
})
