import {getUserProfile, updateUserProfile} from '../services/profileService.js';
import cloudinary from '../utils/cloudinary.js';
import fs from 'fs';
//get user profile by ID
export const getUser=async (req, res) =>{
      try {
    const user = await getUserProfile(req.user.id);
    res.status(200).json({ user });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}
// Update user profile
export const updateUser = async (req, res) => {
  try {
    if (!req.file) {
      const updatedUser = await updateUserProfile(req.user.id, req.body, null);
      return res.status(200).json({ message: 'Profile updated', user: updatedUser });
    }

    cloudinary.uploader.upload_stream(
      { folder: 'user_profiles' },
      async (error, result) => {
        if (error) return res.status(500).json({ message: 'Cloudinary upload failed' });

        const imagePath = result.secure_url;
        const updatedUser = await updateUserProfile(req.user.id, req.body, imagePath);
        res.status(200).json({ message: 'Profile updated', user: updatedUser });
      }
    ).end(req.file.buffer);

  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
};

  