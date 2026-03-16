import { NextRequest, NextResponse } from 'next/server';
import { validateChatRequest, sanitizeMessage, preCheckRelevance } from '@/lib/chat/validate';
import { generateAnswer } from '@/lib/chat/model';
import { ChatResponse } from '@/lib/chat/types';

function json(data: ChatResponse, status: number = 200) {
  return NextResponse.json(data, { status });
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const body = await req.json().catch(() => null);

    const validation = validateChatRequest(body);
    if (!validation.valid) {
      return json({ success: false, answer: null, error: validation.error }, 400);
    }

    const message = sanitizeMessage((body as { message: string }).message);

    const redirect = preCheckRelevance(message);
    if (redirect) {
      return json({ success: true, answer: redirect, error: null });
    }

    const result = await generateAnswer(message);

    if (result.error) {
      return json({ success: false, answer: result.answer, error: 'Service temporarily unavailable.' }, 503);
    }

    return json({ success: true, answer: result.answer, error: null });
  } catch {
    return json({ success: false, answer: null, error: 'An unexpected error occurred.' }, 500);
  }
}
