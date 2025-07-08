// controllers/user-controllers/favorite.controller.js
import { getUserFavorites } from '../../services/user-services/favourite.service.js';

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
