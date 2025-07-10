// controllers/user-controllers/favorite.controller.js
import { getUserFavorites } from '../../services/user-services/favourite.service.js';
import User from '../../models/User.js'; // [MODIFIED] Import User model

export const getUserFavoritePlaces = async (req, res) => {
  try {
    const userId = req.user.id;

    const favorites = await getUserFavorites(userId);

    res.json({
      success: true,
      data: favorites,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch favorite places.',
      error: err.message,
    });
  }
};

// [MODIFIED] Controller to update user's last known location
// Endpoint: PATCH /user/location
export const updateUserLocation = async (req, res) => {
  try {
    const userId = req.user.id;
    const { lat, lng } = req.body;
    if (typeof lat !== 'number' || typeof lng !== 'number') {
      return res.status(400).json({ message: 'Latitude and longitude are required as numbers.' });
    }
    const user = await User.findByIdAndUpdate(
      userId,
      { lastLat: lat, lastLng: lng },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    res.status(200).json({ message: 'Location updated successfully.', user });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
