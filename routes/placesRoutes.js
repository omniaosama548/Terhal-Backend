import express from "express";
import {
  handleSearchPlaces,
  handleGetTopPlaces,
  handleSuggestedOrAllPlaces,
} from "../controllers/placesController.js";
import { optionalAuthMiddleware } from "../middlewares/optionalAuthMiddleware.js";

const router = express.Router();

router.get("/search", handleSearchPlaces);
router.get("/top", handleGetTopPlaces);
router.get("/suggested", optionalAuthMiddleware, handleSuggestedOrAllPlaces);

export default router;
