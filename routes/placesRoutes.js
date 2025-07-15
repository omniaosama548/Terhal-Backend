import express from "express";
import {
  handleSearchPlaces,
  handleGetTopPlaces,
  handleSuggestedOrAllPlaces,
  handleGetPlaceById,
  handleGetPlacesNearby,
  getAllPlaces, 
} from "../controllers/placesController.js";
import { optionalAuthMiddleware } from "../middlewares/optionalAuthMiddleware.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();
router.get('/',getAllPlaces);// anyone can get all places
router.get("/search", handleSearchPlaces); // any can search
router.get("/top", handleGetTopPlaces); // any one can get the top places
router.get("/suggested", optionalAuthMiddleware, handleSuggestedOrAllPlaces); // get all places if not reg , recommended if reg
router.get("/nearby", authMiddleware, handleGetPlacesNearby); // Only logged-in users can access
router.get("/:id",authMiddleware,handleGetPlaceById) // get place , add it to the history
export default router;
