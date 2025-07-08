// services/userService.js
import User from '../../models/User.js';
import bcrypt from 'bcryptjs';

export const softDeleteUser = async (userId, password) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error('User not found.');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Incorrect password.');
  }

  user.isDeleted = true;
  await user.save();

  return user;
};

export const reactivateUser = async (userId, password) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error('User not found.');
  }

  if (!user.isDeleted) {
    throw new Error('Account is already active.');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Incorrect password.');
  }

  user.isDeleted = false;
  await user.save();

  return user;
};
