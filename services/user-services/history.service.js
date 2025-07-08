// services/historyService.js
import History from '../../models/History.js';

export const getUserPlaceHistory = async (userId) => {
  const history = await History.find({ userId }).populate('placeId');
  return history;
};
