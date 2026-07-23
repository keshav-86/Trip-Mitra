
import bcrypt from "bcrypt";
import User from "../models/User";
import jwt from "jsonwebtoken";
import { generateOtp, hashOtp } from "../utils/otp";
import { emailService } from "../services/email.service";

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
  const plainTextOtp = generateOtp(6);
  const hashedOtp = hashOtp(plainTextOtp);
  const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

  const user = await User.create({
    fullName,
    email,
    password: hashedPassword,
    isVerified: false,
    otp: hashedOtp,
    otpExpiry,
  });

  console.log("📩 About to send OTP email to:", email);

  // Send email in background (non-blocking)
  emailService
    .sendOtpEmail(email, fullName, plainTextOtp)
    .then(() => {
      console.log("✅ OTP email sent successfully");
    })
    .catch((err) => {
      console.error("❌ OTP email failed:", err);
    });

  return user;
};

export const loginUser = async (
  email: string,
  password: string
) => {
  console.log("=== LOGIN DEBUG ===");
  console.log("Email Received:", email);

  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  if (!user.isVerified) {
    throw new Error("Please verify your email address to log in.");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  console.log("✅ Login Successful");

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