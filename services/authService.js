import User from "../models/User.js";
import crypto from "crypto";
import sendEmail from "../utils/sendEmail.js";
import bcrypt from "bcryptjs";
//handle forget password
export const handleForgetPassword=async (email) =>{
const user=await User.findOne({email});
  if (!user) throw new Error("Email not found");
  const token = crypto.randomBytes(32).toString("hex");
    user.passwordResetToken = token;
    user.passwordResetTokenExpires = Date.now() + 1000 * 60 * 15 ; //15 minutes
    await user.save();
    const resetLink = `${process.env.CLIENT_URL}/reset-password/${token}`;
    await sendEmail({
        to: user.email,
        subject: "Password Reset Request",
        html: `<p>Click the link below to reset your password:</p>
           <a href="${resetLink}">${resetLink}</a>
           <p>Link expires in 15 minutes.</p>`,
    })
     return "Reset link sent to your email";
}
//handle reset password
export const handleResetPassword = async (token, newPassword) => {
    const user=await User.findOne({
        passwordResetToken: token,
        passwordResetTokenExpires: { $gt: Date.now() } 
    });
    if (!user) throw new Error("Invalid or expired token");
    user.password = newPassword;
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpires = undefined;
    await user.save();
    return "Password reset successfully";
}