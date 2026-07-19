"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyOtp = exports.hashOtp = exports.generateOtp = void 0;
const crypto_1 = __importDefault(require("crypto"));
/**
 * Generates a secure, cryptographically random numeric OTP code of specified length.
 * @param length Length of the OTP (default is 6)
 */
const generateOtp = (length = 6) => {
    if (length <= 0)
        return "";
    // Generate random bytes to ensure high entropy
    const digits = "0123456789";
    let otp = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = crypto_1.default.randomInt(0, digits.length);
        otp += digits[randomIndex];
    }
    return otp;
};
exports.generateOtp = generateOtp;
/**
 * Hashes an OTP string using SHA-256 for secure database storage.
 * @param otp Plain text OTP
 */
const hashOtp = (otp) => {
    return crypto_1.default.createHash("sha256").update(otp).digest("hex");
};
exports.hashOtp = hashOtp;
/**
 * Compares a plain text OTP with a stored SHA-256 hash using a timing-safe comparison.
 * @param otp Plain text OTP received from user
 * @param hashedOtp Stored SHA-256 hash
 */
const verifyOtp = (otp, hashedOtp) => {
    const currentHash = (0, exports.hashOtp)(otp);
    // Timing-safe buffer comparison to prevent timing attacks
    const currentBuffer = Buffer.from(currentHash, "hex");
    const storedBuffer = Buffer.from(hashedOtp, "hex");
    if (currentBuffer.length !== storedBuffer.length) {
        return false;
    }
    return crypto_1.default.timingSafeEqual(currentBuffer, storedBuffer);
};
exports.verifyOtp = verifyOtp;
//# sourceMappingURL=otp.js.map