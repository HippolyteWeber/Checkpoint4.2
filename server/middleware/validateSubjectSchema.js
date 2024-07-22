const { z } = require("zod");

const subjectSchema = z.object({
  title: z.string().min(3, {
    message: "Le titre doit contenir au moins 3 caractères",
  }),
  description: z.string().min(10, {
    message: "La description doit contenir au moins 10 caractères",
  }),
  text: z
    .string()
    .min(10, {
      message: "La description doit contenir au moins 10 caractères",
    })
    .max(1000, {
      message: "La description ne peut pas contenir plus de 1000 caractères",
    }),

  userId: z.number(),
});

const validateSubjectSchema = (req, res, next) => {
  const { title, description, text, userId } = req.body;

  const validate = subjectSchema.safeParse({
    title,
    description,
    text,
    userId,
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

module.exports = validateSubjectSchema;
