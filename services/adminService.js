import Admin from '../models/Admin.js';

export const addAdminService = async (data) => {
  const { name, email, password, isSuper  } = data;

  const exists = await Admin.findOne({ email });
  if (exists) throw new Error('Email already exists');

  const admin = new Admin({ name, email, password, isSuper });
  return await admin.save();
};

export const updateAdminService = async (id, data) => {
  const admin = await Admin.findById(id);
  if (!admin) {
    throw new Error('Admin not found');
  }

  
// cant make the super admin ordinary admin
  if ('isSuper' in data) {
    delete data.isSuper;
  }

  const allowedFields = ['name', 'email', 'password'];
  const filteredData = Object.fromEntries(
    Object.entries(data).filter(([key]) => allowedFields.includes(key))
  );

  const updatedAdmin = await Admin.findByIdAndUpdate(id, filteredData, { new: true });
  return updatedAdmin;
};

export const deleteAdminService = async (id) => {
  const admin = await Admin.findById(id);
  if (!admin) {
    throw new Error('Admin not found');
  }
  if (admin.isSuper) {
    throw new Error('Cannot delete a super admin');
  }
  return await Admin.findByIdAndDelete(id);
};
