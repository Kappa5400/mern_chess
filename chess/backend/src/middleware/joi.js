import joi from "joi";

export const createPuzzleSchema = Joi.object({
  pgn: joi.string().min(5).required(),
});
