// services/ratingService.js
import RatingPlace from "../../models/place-models/RatingPlace.Model.js";
import Place from "../../models/place-models/Place.Model.js";

export const ratePlace = async (userId, placeId, ratingValue) => {
  // Validate range
  if (ratingValue < 1 || ratingValue > 5) {
    throw new Error("Rating must be between 1 and 5");
  }

  // 1️⃣ Check if place exists & visible
  const place = await Place.findOne({ _id: placeId});
  if (!place) {
    throw new Error("Place not found");
  }

  // 2️⃣ Check if user has already rated -> update it, else create
  const existing = await RatingPlace.findOne({ userId, placeId });

  if (existing) {
    existing.rating = ratingValue;
    await existing.save();
  } else {
    await RatingPlace.create({
      userId,
      placeId,
      rating: ratingValue,
    });
  }

  // 3️⃣ Update place avg rating
  const allRatings = await RatingPlace.find({ placeId });
  const avgRating = allRatings.reduce((sum, r) => sum + r.rating, 0) / allRatings.length;

  place.rating = avgRating;
  await place.save();

  return { message: "Rating saved", newRating: ratingValue, avgRating };
};
export const getPlaceRating = async (placeId) => {
  // ✅ 1️⃣ Check if place exists
  const place = await Place.findById(placeId);
  if (!place) {
    throw new Error("Place not found");
  }

  // ✅ 2️⃣ Get all ratings for the place
  const ratings = await RatingPlace.find({ placeId });

  // ✅ 3️⃣ Calculate average rating
  let avgRating = null;

  if (ratings.length > 0) {
    const sum = ratings.reduce((total, r) => total + Number(r.rating || 0), 0);
    avgRating = sum / ratings.length;
  }

  return {
    avgRating: avgRating !== null ? Number(avgRating.toFixed(1)) : null,
    totalRatings: ratings.length
  };
};

export const getUserRatingForPlace = async (userId, placeId) => {
  // 1️⃣ Check if place exists & visible
  const place = await Place.findOne({ _id: placeId});
  if (!place) {
    throw new Error("Place not found ");
  } 
    // 2️⃣ Get user's rating for the place
    const userRating = await RatingPlace.findOne({ userId, placeId });
    if (!userRating) {
      return { rating: null, message: "User has not rated this place" };
    }
    return { rating: userRating.rating, message: "User rating found" };
}
export const deleteUserRating = async (userId, placeId) => {
  // 1️⃣ Check if place exists & visible
  const place = await Place.findOne({ _id: placeId});
  if (!place) {
    throw new Error("Place not found ");
  } 
    // 2️⃣ Check if user has rated the place
    const userRating = await RatingPlace.findOne({ userId, placeId });
    if (!userRating) {  
        return { message: "User has not rated this place" };
        }
    // 3️⃣ Delete user's rating
    await RatingPlace.deleteOne({ userId, placeId });
    // 4️⃣ Recalculate average rating for the place
    const allRatings = await RatingPlace.find({ placeId });
    const avgRating = allRatings.length > 0
        ? allRatings.reduce((sum, r) => sum + r.rating, 0) / allRatings.length
        : null;
    place.rating = avgRating;
    await place.save();
    return { message: "User rating deleted", avgRating };
};

