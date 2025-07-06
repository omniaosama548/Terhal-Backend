import express from "express";
import {
  handleSearchPlaces,
  handleGetTopPlaces,
} from "../controllers/placesController.js";

const router = express.Router();

router.get("/search", handleSearchPlaces);
router.get("/top", handleGetTopPlaces);

export default router;
