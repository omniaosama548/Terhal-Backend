// controllers/ratingController.js
import { ratePlace,
    getPlaceRating,
    getUserRatingForPlace,
    deleteUserRating,

 }
 from "../../services/place-services/RatingPlace.service.js";


export const ratePlaceController = async (req, res) => {
  const userId = req.user.id; // From JWT
  const placeId = req.params.id;
  const { rating } = req.body;

  try {
    const result = await ratePlace(userId, placeId, rating);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getPlaceRatingController = async (req, res) => {
  const placeId = req.params.id;

  try {
    const result = await getPlaceRating(placeId);
    res.status(200).json(result);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
export const getUserRatingForPlaceController = async (req, res) => {
  const userId = req.user.id; // From JWT
  const placeId = req.params.id;

  try {
    const result = await getUserRatingForPlace(userId, placeId);
    res.status(200).json(result);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
export const deleteUserRatingController = async (req, res) => {
  const userId = req.user.id; // From JWT
  const placeId = req.params.id;

  try {
    const result = await deleteUserRating(userId, placeId);
    res.status(200).json(result);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};



