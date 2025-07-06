// services/favouriteService.js
import Favourite from "../../models/Favorite.js";
import Place from "../../models/Place.js";

export const savePlaceToFavourites = async (userId, placeId) => {
  // 1️⃣ Check if place exists
  const place = await Place.findOne({ _id: placeId });
  if (!place) {
    throw new Error("Place not found ");
  }

  // 2️⃣ Check if already favourited
  const exists = await Favourite.findOne({ userId, placeId });
  if (exists) {
    throw new Error("Already in favourites");
  }

  // 3️⃣ Save to favourites
  const favourite = await Favourite.create({ userId, placeId });
  return favourite;
};
export const getFavouritesByUserId = async (userId) => {
  // 1️⃣ Find favourites by userId
  const favourites = await Favourite.find({ userId }).populate("placeId");

  // 2️⃣ Check if any favourites found
  if (!favourites || favourites.length === 0) {
    throw new Error("No favourites found for this user");
  }

  return favourites;
};
export const removeFavourite = async (userId, placeId) => {
  // 1️⃣ Check if favourite exists
  const favourite = await Favourite.findOne({ userId, placeId });
  if (!favourite) {
    throw new Error("Favourite not found");
  }
  // 2️⃣ Remove favourite
  await Favourite.deleteOne({ userId, placeId });
  return { message: "Favourite removed successfully" };
};
export const isPlaceFavourited = async (userId, placeId) => {
  // 1️⃣ Check if favourite exists
  const favourite = await Favourite.findOne({ userId, placeId });
  if (!favourite) {
    return false; // Not favourited
  }
  return true; // Favourited
};
export const getFavouriteCount = async (placeId) => {
  // 1️⃣ Count favourites for the place
  const count = await Favourite.countDocuments({ placeId });

  // 2️⃣ Return count
  return count;
};
// 1️⃣ Find favourites by placeId
//   const favourites = await Favourite.find({ placeId }).populate("userId");

//   // 2️⃣ Check if any favourites found
//   if (!favourites || favourites.length === 0) {
//     throw new Error("No favourites found for this place");
//   }

//   return favourites;
// };

// export const getFavouriteById = async (favouriteId) => {
//   // 1️⃣ Find favourite by ID
//   const favourite = await Favourite.findById(favouriteId).populate("placeId");

//   // 2️⃣ Check if favourite exists
//   if (!favourite) {
//     throw new Error("Favourite not found");
//   }

//   return favourite;
// };

// export const updateFavourite = async (favouriteId, updateData) => {
//   // 1️⃣ Find favourite by ID
//   const favourite = await Favourite.findById(favouriteId);
//   if (!favourite) {
//     throw new Error("Favourite not found");
//   }
//     // 2️⃣ Update favourite
//     Object.assign(favourite, updateData);
//     await favourite.save();
//     return favourite;
// };
export const getAllFavourites = async () => {
  // 1️⃣ Get all favourites
  const favourites = await Favourite.find().populate("placeId");

  // 2️⃣ Check if any favourites found
  if (!favourites || favourites.length === 0) {
    throw new Error("No favourites found");
  }

  return favourites;
};

export const deleteFavouritesByUserId = async (userId) => {
  // 1️⃣ Delete favourites by userId
  const result = await Favourite.deleteMany({ userId });

  // 2️⃣ Check if any favourites were deleted
  if (result.deletedCount === 0) {
    throw new Error("No favourites found for this user");
  }

  return { message: "All favourites deleted successfully" };
};
