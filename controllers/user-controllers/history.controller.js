// controllers/historyController.js
import { getUserPlaceHistory } from '../../services/user-services/history.service.js';

export const viewUserHistory = async (req, res) => {
  try {
    const userId = req.user.id; 
    const history = await getUserPlaceHistory(userId);
    res.json({ history });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching user history', error: err.message });
  }
};
