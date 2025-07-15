import OpenAI from 'openai';
import dotenv from 'dotenv';
import Place from '../models/Place.js';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const getReply = async (userMessage) => {
  try {
    const relevanceCheck = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `You are an assistant that decides if a user message is relevant to travel planning.
If the message clearly asks about places, locations, tours, or trip planning, respond only with "VALID".
If the message is a joke, greeting, random comment, or not related to travel/tourism, respond only with "INVALID".`,
        },
        { role: 'user', content: userMessage },
      ],
      temperature: 0,
      max_tokens: 10,
    });

    const checkResponse = relevanceCheck.choices[0]?.message?.content.trim();

    if (checkResponse !== 'VALID') {
      return JSON.stringify({ error: 'Your message is not related to travel planning. Please try again with a relevant query.' });
    }

    const places = await Place.find({}, 'name location category');

    const simplifiedPlaces = places.map((place) => ({
      name: place.name,
      location: place.location,
      category: place.category,
    }));

    const messages = [
      {
        role: 'system',
        content: `You are a helpful assistant in a tour guide web app.
Only respond with **valid JSON** in the following format (no explanation, just the JSON):
[
  {
    "day": "Day 1",
    "places": ["Place A", "Place B"]
  },
  ...
]

Use ONLY relevant places from this list based on user preferences.
Filter places based on:
1. The **location** the user mentions (e.g., "Cairo")
2. The **category** that matches their interest (e.g., "history tour")

Here is the list of places:
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
