import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { registerUser, loginUser, generateToken } from "./auth.service";

export const register = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const { fullName, email, password } = req.body;

    const user = await registerUser(fullName, email, password);

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
      },
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Something went wrong",
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const { email, password } = req.body;

    const user = await loginUser(email, password);

    const token = generateToken(user._id.toString());

return res.status(200).json({
  success: true,
  message: "Login successful",
  token,
  data: {
    id: user._id,
    fullName: user.fullName,
    email: user.email,
  },
});
  } catch (error) {
    return res.status(400).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Something went wrong",
    });
  }
};