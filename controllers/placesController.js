import { searchPlaces, getTopPlaces } from "../services/palcesService.js";

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
