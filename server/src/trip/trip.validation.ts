import { body } from "express-validator";

export const createTripValidation = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required"),

  body("destination")
    .trim()
    .notEmpty()
    .withMessage("Destination is required"),

  body("startDate")
    .isISO8601()
    .withMessage("Invalid start date"),

  body("endDate")
    .isISO8601()
    .withMessage("Invalid end date"),

  body("budget")
    .isNumeric()
    .withMessage("Budget must be a number"),
];