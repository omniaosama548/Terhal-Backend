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
    let imagePath = null;

    if (req.file) {
      
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'user_profiles', 
      });

      imagePath = result.secure_url;
      fs.unlinkSync(req.file.path);
    }

    const updatedUser = await updateUserProfile(req.user.id, req.body, imagePath);
    res.status(200).json({ message: 'Profile updated', user: updatedUser });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
  