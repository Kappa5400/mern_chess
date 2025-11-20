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

export const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      return res.status(400).json({ Error: error.details[0].message });
    }
    next();
  };
};
