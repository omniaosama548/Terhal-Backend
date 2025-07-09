import OpenAI from 'openai';
import dotenv from 'dotenv';
import Place from '../models/Place.js';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const getReply = async (userMessage) => {
  try {
    const places = await Place.find({}, 'name');

    const simplifiedPlaces = places.map((place) => ({
      name: place.name,
      location: place.location,
      description: place.description,
    }));

    const messages = [
      {
        role: 'system',
        content: `You are a helpful assistant in a tour guide web app.

Your task is to help users plan trips to cities in Egypt. 
You are a helpful assistant in a tour guide web app.
Your task is to help users plan trips...

Only respond with **valid JSON** in the following format (no explanation, just the JSON):


[
  {
    "day": "Day 1",
    "places": ["Place A", "Place B"],
    "advice": "Helpful tip for the day"
  },
  ...
]

Use only relevant places and add a short advice for each day.

Here is the list of available places:
${JSON.stringify(simplifiedPlaces)}
      `,
      },
      { role: 'user', content: userMessage },
    ];

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages,
      max_tokens: 2000,
      temperature: 0.7,
    });

    return completion.choices[0]?.message?.content;
  } catch (error) {
    console.error('Chat error:', error);
    throw new Error('Failed to generate assistant reply');
  }
};
