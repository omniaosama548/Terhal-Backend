import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const AdminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  isSuper: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// 🔐 Hash password before saving (for new documents)
AdminSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// 🔐 Hash password before updating (for update operations)
AdminSchema.pre(['findOneAndUpdate', 'updateOne', 'updateMany'], async function (next) {
  const update = this.getUpdate();
  
  // Check if password is being updated
  if (update.password || (update.$set && update.$set.password)) {
    const passwordToHash = update.password || update.$set.password;
    
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(passwordToHash, salt);
      
      // Update the password in the update object
      if (update.password) {
        update.password = hashedPassword;
      } else if (update.$set && update.$set.password) {
        update.$set.password = hashedPassword;
      }
      
      next();
    } catch (err) {
      next(err);
    }
  } else {
    next();
  }
});

// Add method to compare passwords
AdminSchema.methods.comparePassword = async function (plainPassword) {
  return await bcrypt.compare(plainPassword, this.password);
};

const Admin = mongoose.model("Admin", AdminSchema);
export default Admin;