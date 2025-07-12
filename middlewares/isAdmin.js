// export const isAdmin = (req, res, next) => {
//   if (!req.user) {
//     return res.status(401).json({ message: "Unauthorized" });
//   }

//   if (req.user.role !== "admin") {
//     return res.status(403).json({ message: "Admins only" });
//   }

//   next();
// };

export const isAdmin = (req, res, next) => {
  if (!req.admin) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (!req.admin.isSuper) {
    return res.status(403).json({ message: 'Admins only' });
  }

  next();
};

