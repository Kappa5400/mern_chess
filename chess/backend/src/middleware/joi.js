import Joi from "joi";

export const createPuzzleSchema = Joi.object({
  pgn: Joi.string().min(5).required(),
  answer: Joi.string().required(),
  rating: Joi.number().integer().min(0).max(2900).required(),
  date: Joi.date(),
});

export const updatePuzzleSchema = Joi.object({
  pgn: Joi.string().min(5),
  answer: Joi.string(),
  rating: Joi.number().integer().min(0).max(2900),
});

export const createUserPuzzleSchema = Joi.object({
  pgn: Joi.string().min(5).required(),
  answer: Joi.string().required(),
  rating: Joi.number().integer().min(0).max(2900).required(),
  date: Joi.date(),
});

export const objectIdSchema = Joi.object({
  id: Joi.string().hex().length(24).required().messages({
    "string.hex": "Invalid ID format",
    "string.length": "Invalid ID length",
  }),
});

export const createUserSchema = Joi.object({
  //change username min later
  username: Joi.string().alphanum().min(1).max(30).required(),
  //add password min char later
  password: Joi.string().min(1).required(),
});

export const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

export const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      return res.status(400).json({ Error: error.details[0].message });
    }
    next();
  };
};
