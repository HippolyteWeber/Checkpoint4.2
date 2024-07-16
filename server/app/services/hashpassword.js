const argon2 = require("argon2");

const hashPassword = async (req, res, next) => {
  const { password } = req.body;

  try {
    const hashedPassword = await argon2.hash(password);

    req.body.password = hashedPassword;

    next();
  } catch (e) {
    res.json({ message: "Une erreur est survenu" });
  }
};

module.exports = hashPassword;
