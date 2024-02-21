import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const config = {
  runtime: 'experimental-edge',
};

export default async function handler(req) {
  if (req.method !== 'POST') {
    return new NextResponse(JSON.stringify({ message: 'Method not allowed' }), {
      status: 405,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  try {
    const body = await req.json();
    const userContent = body.content; // Assuming the request body has a 'content' field with the user's text.

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { "role": "system", "content": "You analyze user intent summaries to detect malicious intent." },
        { "role": "user", "content": userContent },
      ],
    });

    const responseContent = completion.data.choices[0].message.content;

    return new NextResponse(JSON.stringify({ decision: responseContent }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error(error);
    return new NextResponse(JSON.stringify({ message: 'Internal Server Error' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
