import bcrypt from 'bcryptjs';
import { generateToken } from '../services/tokenService.js';
import Admin from '../models/Admin.js';

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // ابحث عن الأدمن
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // تحقق من كلمة المرور
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // أنشئ التوكن
    const token = generateToken({ id: admin._id , role:"admin"});

    // أعد البيانات بدون كلمة المرور
    res.json({
      message: "Login successful",
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        isSuper: admin.isSuper
      }
    });

  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
