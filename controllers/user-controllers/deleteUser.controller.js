// controllers/user-controllers/user.controller.js
import { softDeleteUser, reactivateUser, permanentlyDeleteUser } from '../../services/user-services/deleteUser.service.js';

export const deleteUserAccount = async (req, res) => {
  try {
    const userId = req.user.id;
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ success: false, message: 'Password is required.' });
    }

    await softDeleteUser(userId, password, userId); // Acting user is the same user

    res.json({ success: true, message: 'Account has been deactivated.' });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const reactivateUserAccount = async (req, res) => {
  try {
    const userId = req.user.id;
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ success: false, message: 'Password is required.' });
    }

    await reactivateUser(userId, password, userId);

    res.json({ success: true, message: 'Account has been reactivated.' });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};


export const hardDeleteUserAccount = async (req, res) => {
  try {
    const userId = req.user.id;
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ success: false, message: 'Password is required for confirmation.' });
    }

    await permanentlyDeleteUser(userId, password);

    res.json({ success: true, message: 'Account has been permanently deleted.' });

  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};