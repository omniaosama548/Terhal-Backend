import { searchPlaces, getTopPlaces ,getPlaceById, getPlaces } from "../services/palcesService.js";
import Place from "../models/Place.js";
import { getFavouritesByUserId } from "../services/place-services/favouritePlace.service.js";
import { getPlacesNearby } from "../services/palcesService.js"; // [MODIFIED] Import the new service
import User from "../models/User.js"; // [MODIFIED] Import User model for fetching user data

// /places/search?q=...
export const handleSearchPlaces = async (req, res) => {
  try {
    const query = req.query.q;
    if (!query) {
      return res.status(400).json({ message: "Search query is required." });
    }

    const places = await searchPlaces(query);
    res.status(200).json(places);
  } catch (err) {
    res.status(500).json({ error: "Something went wrong", details: err.message });
  }
};

// /places/top
export const handleGetTopPlaces = async (req, res) => {
  try {
    const topPlaces = await getTopPlaces();
    res.status(200).json(topPlaces);
  } catch (err) {
    res.status(500).json({ error: "Something went wrong", details: err.message });
  }
};
// [MODIFIED] New controller for suggested or all places
export const handleSuggestedOrAllPlaces = async (req, res) => {
  try {
    // Pagination params
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;
    // Location params (optional)
    const lat = req.query.lat ? parseFloat(req.query.lat) : null;
    const lng = req.query.lng ? parseFloat(req.query.lng) : null;

    if (req.user && req.user.id) {
      console.log('[DEBUG] User ID:', req.user.id); // Debug log
      let favourites = [];
      let categories = [];
      try {
        const userIdStr = String(req.user.id);
        favourites = await getFavouritesByUserId(userIdStr);
        console.log('[DEBUG] Favourites found:', favourites.map(f => f.placeId && f.placeId.name)); // Debug log
      } catch (e) {
        console.warn('[WARN] No favourites found or error:', e.message); // Warn log
      }
      if (favourites && favourites.length > 0) {
        const categorySet = new Set();
        favourites.forEach(fav => {
          const cat = fav.placeId && typeof fav.placeId.category === 'string' && fav.placeId.category.trim();
          if (cat) categorySet.add(cat);
        });
        categories = Array.from(categorySet);
        console.log('[DEBUG] Using categories for suggestion:', categories); // Debug log
      } else {
        console.warn('[WARN] No favorites for this user.'); // Warn log
      }
      // Build query for suggestions
      let query = { visible: true };
      if (categories.length > 0) {
        query.category = { $in: categories };
      }
      let placesQuery = Place.find(query);
      if (lat !== null && lng !== null) {
      }
      placesQuery = placesQuery.skip(skip).limit(limit);
      const suggestedPlaces = await placesQuery;
      // Count total for pagination
      const total = await Place.countDocuments(query);
      return res.status(200).json({ 
        suggested: true, 
        categories: categories.length > 0 ? categories : null, 
        places: suggestedPlaces,
        pagination: { page, limit, total, totalPages: Math.ceil(total / limit) }
      });
    } else {
      // Anonymous user: return all visible places with pagination
      console.warn('[WARN] User is not logged in or token is invalid. Returning all visible places.');
      const query = { visible: true };
      const places = await Place.find(query).skip(skip).limit(limit);
      const total = await Place.countDocuments(query);
      return res.status(200).json({ 
        suggested: false, 
        places,
        pagination: { page, limit, total, totalPages: Math.ceil(total / limit) }
      });
    }
  } catch (err) {
    console.error('[ERROR] Error in suggestion logic:', err); // Error log
    res.status(500).json({ error: "Something went wrong", details: err.message });
  }
};

export const handleGetPlaceById = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log(userId,"user");
    
    if (!userId) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    const placeId = req.params.id;
    const place = await getPlaceById(placeId, userId);

    if (!place) {
      return res.status(404).json({ success: false, message: 'Place not found' });
    }

    // --- Suggestion logic ---
    // Pagination params
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 5;
    const skip = (page - 1) * limit;
    // Location params (optional)
    const lat = req.query.lat ? parseFloat(req.query.lat) : null;
    const lng = req.query.lng ? parseFloat(req.query.lng) : null;

    // Suggest places in the same category 
    let suggestionQuery = { visible: true, category: place.category, _id: { $ne: placeId } };
    let suggestionsQuery = Place.find(suggestionQuery);
    // If location is available, add location-based logic (placeholder)
    if (lat !== null && lng !== null) {
    }
    suggestionsQuery = suggestionsQuery.skip(skip).limit(limit);
    const suggestions = await suggestionsQuery;
    const totalSuggestions = await Place.countDocuments(suggestionQuery);

    res.json({ 
      success: true, 
      data: place,
      suggestions: {
        places: suggestions,
        pagination: { page, limit, total: totalSuggestions, totalPages: Math.ceil(totalSuggestions / limit) }
      }
    });
  } catch (err) {
    console.error('Error in handleGetPlaceById:', err);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// [MODIFIED] Controller to get places near a user's location
// Endpoint: GET /places/nearby?
export const handleGetPlacesNearby = async (req, res) => {
  try {
    // Get latitude, longitude, and optional radius from query params
    let lat = req.query.lat ? parseFloat(req.query.lat) : null;
    let lng = req.query.lng ? parseFloat(req.query.lng) : null;
    const radius = req.query.radius ? parseFloat(req.query.radius) : 5; // Default 5km

    // [MODIFIED] If lat/lng not provided, fetch from user data in DB
    if ((lat === null || lng === null) && req.user && req.user.id) {
      const user = await User.findById(req.user.id);
      if (user) {
        lat = user.lastLat;
        lng = user.lastLng;
      }
    }

    // Validate input
    if (lat === null || lng === null) {
      return res.status(400).json({ message: "Latitude and longitude are required, either in query or user profile." });
    }

    // Get nearby places using the service
    const places = await getPlacesNearby(lat, lng, radius);
    // Respond with the found places
    return res.status(200).json({
      success: true,
      message: `Places within ${radius} km of (${lat}, ${lng})`,
      places
    });
  } catch (err) {
    // Log and return error
    console.error('[ERROR] Error in handleGetPlacesNearby:', err);
    res.status(500).json({ error: "Something went wrong", details: err.message });
  }
};

export const getAllPlaces = async (req, res) => {
  try {
    const places = await getPlaces(req.query);
    res.status(200).json(places);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};