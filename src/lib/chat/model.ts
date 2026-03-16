import OpenAI from 'openai';
import { buildMessages } from './prompt';

const FALLBACK_MESSAGE = "I'm temporarily unable to respond right now. Please try again in a moment.";
const MODEL = 'gpt-4o-mini';
const MAX_TOKENS = 300;
const TEMPERATURE = 0.4;
const TIMEOUT_MS = 15000;

let client: OpenAI | null = null;

function getClient(): OpenAI {
  if (!client) {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey || apiKey === 'your-api-key-here') {
      throw new Error('OPENAI_API_KEY not configured');
    }
    client = new OpenAI({ apiKey, timeout: TIMEOUT_MS });
  }
  return client;
}

export async function generateAnswer(userMessage: string): Promise<{ answer: string; error: boolean }> {
  try {
    const openai = getClient();
    const messages = buildMessages(userMessage);

    const response = await openai.chat.completions.create({
      model: MODEL,
      messages,
      max_tokens: MAX_TOKENS,
      temperature: TEMPERATURE,
    });

    const content = response.choices?.[0]?.message?.content?.trim();

    if (!content) {
      return { answer: FALLBACK_MESSAGE, error: true };
    }

    return { answer: content, error: false };
  } catch (err) {
    console.error('[chat/model] OpenAI request failed:', (err as Error).message);
    return { answer: FALLBACK_MESSAGE, error: true };
  }
}
