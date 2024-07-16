const { z } = require("zod");

const userRegex =
  /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,32}$/;

const userSchema = z.object({
  pseudo: z
    .string({
      invalid_type_error: "Votre prénom n'est pas valide",
    })
    .min(3, {
      message: "Votre prénom doit contenir au minimun 3 lettres",
    })
    .max(20, {
      message: "Votre prénom ne peut pas contenir plus de 20 lettres",
    }),
  email: z.string().email({
    invalid_type_error: "Votre email est invalide",
  }),
  password: z.string().regex(userRegex, {
    message:
      "Votre mot de passe doit contenir au minimun 1 chiffre, 1 majuscule, 1 minuscule, un caractère spéciale et faire entre 8 et 32 caractères",
  }),
});

const validateUserSchema = (req, res, next) => {
  const { pseudo, email, password } = req.body;

  const validate = userSchema.safeParse({
    pseudo,
    email,
    password,
  });

  if (!validate.success) {
    const errors = validate.error.issues.reduce((acc, issue) => {
      acc[issue.path[0]] = issue.message;
      return acc;
    }, {});
    return res.status(404).json(errors);
  }
  return next();
};

module.exports = validateUserSchema;
