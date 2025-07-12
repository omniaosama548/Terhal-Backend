// controllers/adminStats.controller.js
import {
  getOverviewStatsService,
  getNationalitiesStatsService,
  getTopRatedPlacesService,
  getReviewsAnalysisService
} from '../services/adminStats.service.js';

export const getOverviewStats = async (req, res) => {
  try {
    const data = await getOverviewStatsService();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getNationalitiesStats = async (req, res) => {
  try {
    const data = await getNationalitiesStatsService();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getTopRatedPlaces = async (req, res) => {
  try {
    const data = await getTopRatedPlacesService();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getReviewsAnalysis = async (req, res) => {
  try {
    const data = await getReviewsAnalysisService();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
