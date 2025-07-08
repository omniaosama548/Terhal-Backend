// services/favoriteService.js
import Favorite from '../../models/Favorite.js';

export const getUserFavorites = async (userId) => {
  // Find all favorites for the user and populate the place details
  const favorites = await Favorite.find({ userId }).populate('placeId');
  return favorites;
};
