// routes/favouriteRoutes.js
import express from "express";
import {
  addToFavourites,
  getFavouritesByUserIdController,
  removeFavouriteController,
  isPlaceFavouritedController,
  deleteFavouritesByUserIdController,
} from "../../controllers/place-controllers/favouritePlace.Controller.js";
import { authMiddleware } from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/place/:id/favourite", authMiddleware, addToFavourites);

router.get("/favourites", authMiddleware, getFavouritesByUserIdController);

router.delete("/place/:id/favourite", authMiddleware, removeFavouriteController);

router.get("/place/:id/is-favourited", authMiddleware, isPlaceFavouritedController);

router.delete("/favourites", authMiddleware, deleteFavouritesByUserIdController);

export default router;
