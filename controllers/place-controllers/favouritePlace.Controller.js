// controllers/favouriteController.js
import {
  savePlaceToFavourites,
  getFavouritesByUserId,
  removeFavourite,
  isPlaceFavourited,
  getFavouriteCount,
  deleteFavouritesByUserId,
} from "../../services/place-services/favouritePlace.service.js";

export const addToFavourites = async (req, res) => {
  const userId = req.user.id; // Comes from JWT
  const placeId = req.params.id;

  try {
    const favourite = await savePlaceToFavourites(userId, placeId);
    res.status(201).json({
      message: "Place added to favourites",
      favourite,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getFavouritesByUserIdController = async (req, res) => {
  const userId = req.user.id; // Comes from JWT

  try {
    const favourites = await getFavouritesByUserId(userId);
    res.status(200).json({
      message: "Favourites retrieved successfully",
      favourites,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
export const removeFavouriteController = async (req, res) => {
  const userId = req.user.id; // Comes from JWT
  const placeId = req.params.id;

  try {
    const result = await removeFavourite(userId, placeId);
    res.status(200).json({
      message: "Favourite removed successfully",
      result,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
export const isPlaceFavouritedController = async (req, res) => {
  const userId = req.user.id; // Comes from JWT
  const placeId = req.params.id;

  try {
    const isFavourited = await isPlaceFavourited(userId, placeId);
    res.status(200).json({
      message: "Check completed",
      isFavourited,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getFavouriteCountController = async (req, res) => {
  const placeId = req.params.id;

  try {
    const count = await getFavouriteCount(placeId);
    res.status(200).json({
      message: "Favourite count retrieved successfully",
      count,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteFavouritesByUserIdController = async (req, res) => {
  const userId = req.user.id; // Comes from JWT

  try {
    const result = await deleteFavouritesByUserId(userId);
    res.status(200).json({
      message: "All favourites deleted successfully",
      result,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
