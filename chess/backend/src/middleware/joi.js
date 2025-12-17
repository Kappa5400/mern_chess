import Joi from "joi";

export const createPuzzleSchema = Joi.object({
  fen: Joi.string().min(1).required(),
  answer: Joi.string().required(),
  rating: Joi.number().integer().min(0).max(2900).required(),
});

export const updatePuzzleSchema = Joi.object({
  pgn: Joi.string().min(1),
  answer: Joi.string(),
  rating: Joi.number().integer().min(0).max(2900),
});

export const createUserPuzzleSchema = Joi.object({
  pgn: Joi.string().min(1).required(),
  answer: Joi.string().required(),
  rating: Joi.number().integer().min(0).max(2900).required(),
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

export const validate = (schema, property) => {
  return (req, res, next) => {
    const target = req[property] || req.body;
    const { error } = schema.validate(target);
    if (error) {
      return res
        .status(400)
        .json({ Error: error.details[0].message, Source: property });
    }
    next();
  };
};
