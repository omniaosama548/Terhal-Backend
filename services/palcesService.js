import History from "../models/History.js";
import Place from "../models/Place.js";

export const searchPlaces = async (query) => {

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
    .limit(3) // Limit the result to top 3 places  used in the home page
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

// [MODIFIED] Helper function to calculate distance between two coordinates (Haversine formula)
function haversineDistance(lat1, lng1, lat2, lng2) {
  const toRad = (value) => (value * Math.PI) / 180;
  const R = 6371; // Earth radius in kilometers
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in kilometers
}

// [MODIFIED] Service to get places near a given location
// lat, lng: user's location; radius: search radius in km (default 5km)
export const getPlacesNearby = async (lat, lng, radius = 5) => {
  const places = await Place.find({ visible: true });
  // Filter places by distance
  const nearbyPlaces = places.filter(place => {
    if (!place.coordinates) return false;
    const [placeLat, placeLng] = place.coordinates.split(',').map(Number);
    if (isNaN(placeLat) || isNaN(placeLng)) return false;
    const distance = haversineDistance(lat, lng, placeLat, placeLng);
    return distance <= radius;
  });
  return nearbyPlaces;
};

export const getPlaces = async (query) => {
  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 10;
  const skip = (page - 1) * limit;

  const filter = { visible: true }; 

  const places = await Place.find(filter).skip(skip).limit(limit);
  const total = await Place.countDocuments(filter); 

  return {
    currentPage: page,
    totalPages: Math.ceil(total / limit),
    totalItems: total,
    data: places,
  };
};

