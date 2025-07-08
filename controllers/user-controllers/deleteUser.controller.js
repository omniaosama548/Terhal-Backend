// controllers/user-controllers/user.controller.js
import { softDeleteUser, reactivateUser } from '../../services/user-services/deleteUser.service.js';

export const deleteUserAccount = async (req, res) => {
  try {
    const userId = req.user.id;
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ success: false, message: 'Password is required for confirmation.' });
    }

    await softDeleteUser(userId, password);

    res.json({ success: true, message: 'Account has been deactivated successfully.' });

  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const reactivateUserAccount = async (req, res) => {
  try {
    const userId = req.user.id;
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ success: false, message: 'Password is required for confirmation.' });
    }

    await reactivateUser(userId, password);

    res.json({ success: true, message: 'Account has been reactivated successfully.' });

  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
