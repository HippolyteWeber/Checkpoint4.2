const tables = require("../database/tables");

const checkExistingUser = async (req, res, next) => {
  const { email, pseudo } = req.body;

  try {
    const existingUser = await tables.user.findUser(email, pseudo);
    if (existingUser) {
      if (existingUser.email === email && existingUser.pseudo === pseudo) {
        res.status(400).json({ message: "Pseudo et email déjà utilisés" });
      } else if (existingUser.email === email) {
        res.status(400).json({ message: "Email déjà utilisé" });
      } else if (existingUser.pseudo === pseudo) {
        res.status(400).json({ message: "Pseudo déjà utilisé" });
      }
    }
    next();
  } catch (e) {
    next(e);
  }
};

module.exports = checkExistingUser;
