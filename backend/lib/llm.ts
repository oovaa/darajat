import { ChatGoogleGenerativeAI } from '@langchain/google-genai'
import 'dotenv/config'
export const llm = new ChatGoogleGenerativeAI({
  model: 'gemini-1.5-pro',
  temperature: 0.3,
  json: true,
  apiKey: process.env.GOOGLE_GENAI_API_KEY,
})
