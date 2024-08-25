import { generateText, streamText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { createOpenAI } from '@ai-sdk/openai';
import readline from 'readline';

function askQuestion(query) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(query, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
}

const groq = createOpenAI({
    baseURL: 'https://api.groq.com/openai/v1',
    apiKey: process.env.GROQ_API_KEY,
});

// Accept user input as prompt
const prompt = await askQuestion('Enter your prompt: ');

const stream = await streamText({
    model: groq('llama-3.1-70b-versatile'),
    prompt: prompt,
});

for await (const char of stream.textStream) {
    console.log(char);
    
}