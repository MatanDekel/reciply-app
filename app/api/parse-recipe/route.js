import Anthropic from '@anthropic-ai/sdk';
import { NextResponse } from 'next/server';

const client = new Anthropic();

export async function POST(req) {
  try {
    const { text } = await req.json();
    if (!text?.trim()) {
      return NextResponse.json({ error: 'No text provided' }, { status: 400 });
    }

    const msg = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: `You are a recipe parser. Parse the following text (which may be in Hebrew or English) into a structured recipe JSON. Preserve the original language of the text.

Return ONLY a valid JSON object — no markdown, no explanation — with these exact fields:
{
  "title": "string",
  "description": "1-2 sentence summary",
  "servings": number or null,
  "prepTime": number (minutes) or null,
  "cookTime": number (minutes) or null,
  "ingredients": [{ "name": "string", "amount": "string", "unit": "string" }],
  "instructions": "steps separated by \\n",
  "tags": ["string"],
  "emoji": "one emoji",
  "lang": "he" or "en"
}

Recipe text:
${text}`,
        },
      ],
    });

    const raw = msg.content[0].text.trim()
      .replace(/^```json?\s*/i, '')
      .replace(/\s*```$/, '');

    const parsed = JSON.parse(raw);
    return NextResponse.json(parsed);
  } catch (err) {
    console.error('parse-recipe error:', err);
    return NextResponse.json({ error: 'Failed to parse recipe' }, { status: 500 });
  }
}
