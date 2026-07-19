"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resendOtp = exports.verifyEmail = exports.updateProfile = exports.profile = exports.login = exports.register = void 0;
const express_validator_1 = require("express-validator");
const User_1 = __importDefault(require("../models/User"));
const otp_1 = require("../utils/otp");
const email_service_1 = require("../services/email.service");
const auth_service_1 = require("./auth.service");
// Register Controller
const register = async (req, res) => {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array(),
            });
        }
        const { fullName, email, password } = req.body;
        const user = await (0, auth_service_1.registerUser)(fullName, email, password);
        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
            },
        });
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: error instanceof Error ? error.message : "Something went wrong",
        });
    }
};
exports.register = register;
// Login Controller
const login = async (req, res) => {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array(),
            });
        }
        const { email, password } = req.body;
        const user = await (0, auth_service_1.loginUser)(email, password);
        const token = (0, auth_service_1.generateToken)(user._id.toString());
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
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: error instanceof Error ? error.message : "Something went wrong",
        });
    }
};
exports.login = login;
// Profile Controller
const profile = async (req, res) => {
    try {
        const user = await User_1.default.findById(req.user?.id).select("-password");
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        return res.status(200).json({
            success: true,
            data: user,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};
exports.profile = profile;
const updateProfile = async (req, res) => {
    try {
        const { fullName, email } = req.body;
        const user = await User_1.default.findByIdAndUpdate(req.user.id, { fullName, email }, { new: true }).select("-password");
        res.json({
            success: true,
            data: user,
            message: "Profile updated successfully",
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update profile",
        });
    }
};
exports.updateProfile = updateProfile;
// Verify Email Controller
const verifyEmail = async (req, res) => {
    try {
        const { email, otp } = req.body;
        if (!email || !otp) {
            return res.status(400).json({
                success: false,
                message: "Email and OTP code are required.",
            });
        }
        const user = await User_1.default.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found.",
            });
        }
        if (user.isVerified) {
            return res.status(400).json({
                success: false,
                message: "Email is already verified.",
            });
        }
        if (!user.otp || !user.otpExpiry) {
            return res.status(400).json({
                success: false,
                message: "No active verification code found.",
            });
        }
        // Check expiry
        if (new Date() > user.otpExpiry) {
            return res.status(400).json({
                success: false,
                message: "Verification code has expired. Please request a new one.",
            });
        }
        // Verify OTP using verifyOtp from utils/otp
        const isValid = (0, otp_1.verifyOtp)(otp, user.otp);
        if (!isValid) {
            return res.status(400).json({
                success: false,
                message: "Invalid verification code.",
            });
        }
        // Set verified
        user.isVerified = true;
        user.otp = "";
        user.otpExpiry = null;
        await user.save();
        return res.status(200).json({
            success: true,
            message: "Email verified successfully. You can now log in.",
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error instanceof Error ? error.message : "Verification failed.",
        });
    }
};
exports.verifyEmail = verifyEmail;
// Resend OTP Controller
const resendOtp = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required.",
            });
        }
        const user = await User_1.default.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found.",
            });
        }
        if (user.isVerified) {
            return res.status(400).json({
                success: false,
                message: "Email is already verified.",
            });
        }
        const plainTextOtp = (0, otp_1.generateOtp)(6);
        const hashedOtp = (0, otp_1.hashOtp)(plainTextOtp);
        const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
        user.otp = hashedOtp;
        user.otpExpiry = otpExpiry;
        await user.save();
        await email_service_1.emailService.sendOtpEmail(email, user.fullName, plainTextOtp);
        return res.status(200).json({
            success: true,
            message: "A new verification code has been sent to your email.",
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error instanceof Error ? error.message : "Failed to resend code.",
        });
    }
};
exports.resendOtp = resendOtp;
//# sourceMappingURL=auth.controller.js.map