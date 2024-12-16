export const verifierRole = (rolesAutorises) => {
    return (req, res, next) => {
      // Vérifiez si le rôle existe dans la requête
      const role = req.userRole;
      if (!role || !rolesAutorises.includes(role)) {
        return res.status(403).json({ message: "Accès interdit : rôle insuffisant." });
      }
      next();
    };
  };
  