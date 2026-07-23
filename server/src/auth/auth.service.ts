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
  const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

  const user = await User.create({
    fullName,
    email,
    password: hashedPassword,
    isVerified: false,
    otp: hashedOtp,
    otpExpiry,
  });

  // Send OTP verification email in background (non-blocking)
  console.log("📩 About to send OTP email to:", email);

try {
  await emailService.sendOtpEmail(email, fullName, plainTextOtp);
  console.log("✅ OTP email function completed");
} catch (err) {
  console.error("❌ OTP email failed:", err);
}

return user;

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

  if (!user.isVerified) {
    throw new Error("Please verify your email address to log in.");
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