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

router.post("/:id/favourite", authMiddleware, addToFavourites); //used

router.get("/favourites", authMiddleware, getFavouritesByUserIdController);

router.delete("/:id/favourite", authMiddleware, removeFavouriteController);

router.get("/:id/is-favourited", authMiddleware, isPlaceFavouritedController);

router.delete("/favourites", authMiddleware, deleteFavouritesByUserIdController);

export default router;
