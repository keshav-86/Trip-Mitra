import bcrypt from "bcrypt";
import User from "../models/User";
import jwt from "jsonwebtoken";

export const registerUser = async (
  fullName: string,
  email: string,
  password: string
) => {
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    fullName,
    email,
    password: hashedPassword,
  });

  return user;
};

export const loginUser = async (
  email: string,
  password: string
) => {
  console.log("=== LOGIN DEBUG ===");
  console.log("Email Received:", email);
  console.log("Password Received:", password);

  const user = await User.findOne({ email });

  console.log("User Found:", user);

  if (!user) {
    throw new Error("Invalid email or password");
  }

  console.log("Stored Password Hash:", user.password);

  const isMatch = await bcrypt.compare(password, user.password);

  console.log("Password Match:", isMatch);

  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  console.log("Login Successful");

  return user;
};

export const generateToken = (userId: string) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET!,
    {
      expiresIn: (process.env.JWT_EXPIRES_IN || "7d") as any,
    }
  );
};