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

router.post("/place/:id/rate", authMiddleware, ratePlaceController);
router.get("/place/:id/rating", getPlaceRatingController);
router.get("/place/:id/user-rating", authMiddleware, getUserRatingForPlaceController);  
router.delete("/place/:id/rating", authMiddleware, deleteUserRatingController);


export default router;
