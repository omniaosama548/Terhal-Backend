import {
  addAdminService,
  updateAdminService,
  deleteAdminService
} from '../services/adminService.js';

export const addAdmin = async (req, res) => {
  try {
    const newAdmin = await addAdminService(req.body);
    console.log(newAdmin);
    
    res.status(201).json(newAdmin);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateAdmin = async (req, res) => {
  try {
    const updated = await updateAdminService(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: 'Admin not found' });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteAdmin = async (req, res) => {
  try {
    const deleted = await deleteAdminService(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Admin not found' });
    res.json({ message: 'Admin deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
