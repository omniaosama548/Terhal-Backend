import express from "express";
import {
  handleSearchPlaces,
  handleGetTopPlaces,
  handleSuggestedOrAllPlaces,
  handleGetPlaceById,
  
} from "../controllers/placesController.js";
import { optionalAuthMiddleware } from "../middlewares/optionalAuthMiddleware.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/search", handleSearchPlaces); // any one can search
router.get("/top", handleGetTopPlaces); // any one can get the top places
router.get("/suggested", optionalAuthMiddleware, handleSuggestedOrAllPlaces);
router.get("/:id",authMiddleware,handleGetPlaceById)
export default router;
