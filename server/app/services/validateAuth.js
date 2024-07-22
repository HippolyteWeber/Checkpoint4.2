const { z } = require("zod");

const userRegex =
  /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,32}$/gm;

const authSchema = z.object({
  email: z.string().email(),
  password: z.string().regex(userRegex),
});

const validateAuth = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    authSchema.parse({ email, password });
    next();
  } catch (e) {
    next(e);
  }
};

module.exports = validateAuth;
