import User from "../models/User.js";
import crypto from "crypto";
import sendEmail from "../utils/sendEmail.js";
import bcrypt from "bcryptjs";
//handle forget password
export const handleForgetPassword=async (email) =>{
const user=await User.findOne({email});
  if (!user) throw new Error("Email not found");
    if (!user.isVerified) throw new Error("Please verify your email first");
  const token = parseInt(crypto.randomBytes(3).toString("hex"), 16) % 900000 + 100000;
    user.passwordResetToken = token;
    user.passwordResetTokenExpires = Date.now() + 1000 * 60 * 15 ; //15 minutes
    await user.save();
    const resetCode = token;
    await sendEmail({
        to: user.email,
        subject: "Password Reset Request",
        html: `<p>This is The Code To Reset Your Password</p>
           <h2 class="text-danger">${resetCode}</h2>
           <p>Code expires in 15 minutes.</p>`,
    })
     return "Reset Code sent to your email";
}
//handle reset password
export const handleResetPassword = async (code, newPassword) => {
  const user = await User.findOne({
    passwordResetToken: code,
    passwordResetTokenExpires: { $gt: Date.now() }
  });

  if (!user) {
    throw new Error("Invalid or expired token");
  }

  if (!user.isVerified) {
    throw new Error("Please verify your email first");
  }

  user.password = newPassword;
  user.passwordResetToken = undefined;
  user.passwordResetTokenExpires = undefined;

  await user.save();

  return "Password reset successfully";
};
