import { GoogleGenAI } from '@google/genai'
import dotenv from 'dotenv'

dotenv.config();

console.log("GEMINI_API_KEY loaded:", process.env.GEMINI_API_KEY ? 'Yes' : 'No');

const client = new GoogleGenAI(process.env.GEMINI_API_KEY)

export default client;