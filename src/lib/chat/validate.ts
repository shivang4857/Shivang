import { ChatRequest } from './types';

const MAX_MESSAGE_LENGTH = 1000;
const MIN_MESSAGE_LENGTH = 1;

export interface ValidationResult {
  valid: boolean;
  error: string | null;
}

export function validateChatRequest(body: unknown): ValidationResult {
  if (!body || typeof body !== 'object') {
    return { valid: false, error: 'Invalid request body.' };
  }

  const { message } = body as Record<string, unknown>;

  if (typeof message !== 'string') {
    return { valid: false, error: 'Message must be a string.' };
  }

  const trimmed = message.trim();

  if (trimmed.length < MIN_MESSAGE_LENGTH) {
    return { valid: false, error: 'Message cannot be empty.' };
  }

  if (trimmed.length > MAX_MESSAGE_LENGTH) {
    return { valid: false, error: `Message too long. Maximum ${MAX_MESSAGE_LENGTH} characters.` };
  }

  return { valid: true, error: null };
}

export function sanitizeMessage(raw: string): string {
  return raw.trim().slice(0, MAX_MESSAGE_LENGTH);
}

const UNRELATED_PATTERNS = [
  /^(what('?s| is) the (weather|time|date|stock|price|score))/i,
  /^(write|generate|create|code|build) (me |a |an )?(python|javascript|java|c\+\+|code|script|program|function|class)/i,
  /^(translate|convert) /i,
  /^(tell me a joke|sing|rap|poem|story about(?! (you|shivang|your)))/i,
  /^(who (is|was) (the )?(president|prime minister|ceo|founder))/i,
  /^(what happened|news|current events)/i,
  /^(solve|calculate|compute|what is \d)/i,
];

const REDIRECT_MESSAGE = "I'm designed to answer questions specifically about Shivang Dwivedi and his portfolio. Feel free to ask about my background, skills, projects, experience, or anything related to my work.";

export function preCheckRelevance(message: string): string | null {
  const lower = message.toLowerCase().trim();
  for (const pattern of UNRELATED_PATTERNS) {
    if (pattern.test(lower)) {
      return REDIRECT_MESSAGE;
    }
  }
  return null;
}
