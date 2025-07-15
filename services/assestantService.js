import OpenAI from 'openai';
import dotenv from 'dotenv';
import Place from '../models/Place.js';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const getReply = async (userMessage) => {
  try {
    const places = await Place.find({}, 'name location category');
    const placeNames = places.map(p => p.name.toLowerCase());

    // Check if user message includes any known place name
    const isRelated = placeNames.some(name => userMessage.toLowerCase().includes(name));

    if (!isRelated) {
      return JSON.stringify({
        message: "Hi , im ai assestant , i can only help you planning a trip accourding to my data"
      });
    }

    const simplifiedPlaces = places.map((place) => ({
      name: place.name,
      location: place.location,
    }));

    const messages = [
      {
        role: 'system',
        content: `You are a tour guide assistant. 
Only reply with JSON in this format: 
[{"day": "Day 1", "places": ["Place A", "Place B"]}]
Use only these places: ${JSON.stringify(simplifiedPlaces)}`,
      },
      { role: 'user', content: userMessage },
    ];

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages,
      max_tokens: 1000,
      temperature: 0.5,
    });

    return completion.choices[0]?.message?.content;
  } catch (error) {
    console.error('Chat error:', error);
    throw new Error('Failed to generate assistant reply');
  }
};
