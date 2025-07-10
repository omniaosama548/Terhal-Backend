import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },

  password: {
    type: String,
    required: true,
    minlength: 6,
  },

  mobile: { type: String, required: true },
  nationality: { type: String, required: true },
  language: { type: String, enum: ['AR', 'EN'], default: 'AR' },
  isDeleted: { type: Boolean, default: false },
  // [MODIFIED] Store user's last known location for notifications
  lastLat: { type: Number, default: null },
  lastLng: { type: Number, default: null },
  image: { type: String, default: '' },

  role: {
    type: String,
    enum: ['traveler', 'admin'],
    default: 'traveler',
  },

  isVerified: { type: Boolean, default: false },
  verificationToken: String,
  verificationTokenExpires: Date,

  passwordResetToken: String,
  passwordResetTokenExpires: Date,
});

//Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;

