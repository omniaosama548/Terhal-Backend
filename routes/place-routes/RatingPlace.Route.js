// routes/ratingRoutes.js
import express from "express";
import { ratePlaceController ,
    getPlaceRatingController,
    getUserRatingForPlaceController,
    deleteUserRatingController,
 }
 from "../../controllers/place-controllers/RatingPlace.controller.js";
import { authMiddleware } from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/:id/rate", authMiddleware, ratePlaceController); //used
router.get("/:id/rating", getPlaceRatingController);
router.get("/:id/user-rating", authMiddleware, getUserRatingForPlaceController);  
router.delete("/:id/rating", authMiddleware, deleteUserRatingController);


export default router;
