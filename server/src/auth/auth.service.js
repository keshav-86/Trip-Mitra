"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = exports.loginUser = exports.registerUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_1 = __importDefault(require("../models/User"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const otp_1 = require("../utils/otp");
const email_service_1 = require("../services/email.service");
const registerUser = async (fullName, email, password) => {
    const existingUser = await User_1.default.findOne({ email });
    if (existingUser) {
        throw new Error("User already exists");
    }
    const hashedPassword = await bcrypt_1.default.hash(password, 10);
    const plainTextOtp = (0, otp_1.generateOtp)(6);
    const hashedOtp = (0, otp_1.hashOtp)(plainTextOtp);
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now
    const user = await User_1.default.create({
        fullName,
        email,
        password: hashedPassword,
        isVerified: false,
        otp: hashedOtp,
        otpExpiry,
    });
    try {
        await email_service_1.emailService.sendOtpEmail(email, fullName, plainTextOtp);
    }
    catch (emailErr) {
        console.error("Failed to send verification email:", emailErr);
    }
    return user;
};
exports.registerUser = registerUser;
const loginUser = async (email, password) => {
    console.log("=== LOGIN DEBUG ===");
    console.log("Email Received:", email);
    console.log("Password Received:", password);
    const user = await User_1.default.findOne({ email });
    console.log("User Found:", user);
    if (!user) {
        throw new Error("Invalid email or password");
    }
    if (!user.isVerified) {
        throw new Error("Please verify your email address to log in.");
    }
    console.log("Stored Password Hash:", user.password);
    const isMatch = await bcrypt_1.default.compare(password, user.password);
    console.log("Password Match:", isMatch);
    if (!isMatch) {
        throw new Error("Invalid email or password");
    }
    console.log("Login Successful");
    return user;
};
exports.loginUser = loginUser;
const generateToken = (userId) => {
    return jsonwebtoken_1.default.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: (process.env.JWT_EXPIRES_IN || "7d"),
    });
};
exports.generateToken = generateToken;
//# sourceMappingURL=auth.service.js.map