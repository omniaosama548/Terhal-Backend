import { searchPlaces, getTopPlaces ,getPlaceById } from "../services/palcesService.js";
import Place from "../models/Place.js";
import { getFavouritesByUserId } from "../services/place-services/favouritePlace.service.js";

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
    // If user is authenticated (registered)
    if (req.user && req.user.id) {
      console.log('[DEBUG] User ID:', req.user.id); // Debug log
      let favourites = [];
      let categories = [];
      try {
        // [FIX] Convert user id to string to match Favorite.userId type
        const userIdStr = String(req.user.id);
        favourites = await getFavouritesByUserId(userIdStr);
        console.log('[DEBUG] Favourites found:', favourites.map(f => f.placeId && f.placeId.name)); // Debug log
      } catch (e) {
        console.warn('[WARN] No favourites found or error:', e.message); // Warn log
      }
      if (favourites && favourites.length > 0) {
        // [FLEXIBLE] Collect all unique categories from user's favorites
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
      // [FLEXIBLE] Suggest all places matching any of the user's favorite categories
      let query = { visible: true };
      if (categories.length > 0) {
        query.category = { $in: categories };
      }
      const suggestedPlaces = await Place.find(query);
      return res.status(200).json({ suggested: true, categories: categories.length > 0 ? categories : null, places: suggestedPlaces });
    } else {
      // Anonymous user: return all visible places
      console.warn('[WARN] User is not logged in or token is invalid. Returning all visible places.');
      const places = await Place.find({ visible: true });
      return res.status(200).json({ suggested: false, places });
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

    res.json({ success: true, data: place });
  } catch (err) {
    console.error('Error in handleGetPlaceById:', err);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
