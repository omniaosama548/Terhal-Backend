// services/adminStats.service.js
import User from '../models/User.js';
import History from '../models/History.js';
import Rating from '../models/Rating.js';
import Review from '../models/Review.js';
import redisClient from '../lib/redisClient.js';

export const getOverviewStatsService = async () => {
  const travelersCount = await User.countDocuments({ role: 'traveler' });

  const onlineUsers = await redisClient.sMembers('onlineUsers');
  const onlineUsersCount = onlineUsers.length;

  const topLikedPlaces = await History.aggregate([
    { $group: { _id: "$placeId", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 5 },
    {
      $lookup: {
        from: 'places',
        localField: '_id',
        foreignField: '_id',
        as: 'place'
      }
    },
    { $unwind: "$place" }
  ]);

  return { travelersCount, onlineUsersCount, topLikedPlaces };
};

export const getNationalitiesStatsService = async () => {
  const nationalities = await User.aggregate([
    { $group: { _id: "$nationality", count: { $sum: 1 } } },
    { $sort: { count: -1 } }
  ]);
  return { nationalities };
};

export const getTopRatedPlacesService = async () => {
  const topRated = await Rating.aggregate([
    {
      $group: {
        _id: "$placeId",
        averageRating: { $avg: "$rating" },
        count: { $sum: 1 }
      }
    },
    { $sort: { averageRating: -1, count: -1 } },
    { $limit: 5 },
    {
      $lookup: {
        from: 'places',
        localField: '_id',
        foreignField: '_id',
        as: 'place'
      }
    },
    { $unwind: "$place" }
  ]);
  return { topRated };
};

export const getReviewsAnalysisService = async () => {
  const statusStats = await Review.aggregate([
    { $group: { _id: "$status", count: { $sum: 1 } } }
  ]);
  return { statusStats };
};
