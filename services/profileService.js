import User from '../models/User.js';
// Get user profile by ID
export const getUserProfile=async (userId)=>{
    const user=await User.findOne({ _id: userId }).select('-password');
    if (!user) throw new Error("User not found");   
    return user;
}
// Update user profile
export const updateUserProfile=async(userId,updateData,imagePath)=>{
    if(imagePath){
        updateData.image=imagePath;
    }
     const user = await User.findByIdAndUpdate(userId, updateData, {
    new: true,
    runValidators: true
  }).select('-password');

  if (!user) throw new Error('User not found or update failed');
  return user;
}