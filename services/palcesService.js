import History from "../models/History.js";
import Place from "../models/Place.js";

// Search places by a keyword query (case-insensitive)
export const searchPlaces = async (query) => {

  // Create a regular expression from the query to match text ignoring case
  const regex = new RegExp(query, "i");

  // Find all visible places where the keyword matches one of these fields
  return await Place.find({
    visible: true, // Only return places marked as visible (not deleted)
    $or: [
      { name: regex },        
      { description: regex }, 
      { location: regex },    
      { address: regex },    
    ],
  })
  .populate("category"); // Replace category ObjectId with full category data
};




// Get the top 10 places with highest ratings
export const getTopPlaces = async () => {
  return await Place.find({ visible: true }) // Only return visible places
    .sort({ rating: -1 }) // Sort places by rating in descending order (highest first)
    .limit(10) // Limit the result to top 10 places
    .populate("category"); // Replace category ObjectId with full category data
};




export const getPlaceById = async (placeId, userId) => {
  const place = await Place.findById(placeId);
  console.log('Place found:', place);

  if (!place) {
    throw new Error('Place not found');
  }

  const existingHistory = await History.findOne({
    userId: userId,
    placeId: placeId,
  });

  if (!existingHistory) {
    await History.create({
      userId: userId,
      placeId: placeId,
    });
    console.log('History created');
  } else {
    console.log('History already exists, skipping insert');
  }

  return place;
};
