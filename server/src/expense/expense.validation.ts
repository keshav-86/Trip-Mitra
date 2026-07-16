import { body } from "express-validator";

export const createExpenseValidation = [
  body("tripId")
    .notEmpty()
    .withMessage("Trip ID is required"),

  body("description")
    .trim()
    .notEmpty()
    .withMessage("Description is required"),

  body("amount")
    .isNumeric()
    .withMessage("Amount must be a number"),

  body("category")
    .notEmpty()
    .withMessage("Category is required"),

  body("participants")
    .isArray({ min: 1 })
    .withMessage("Participants are required"),
];