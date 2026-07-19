import crypto from "crypto";

/**
 * Generates a secure, cryptographically random numeric OTP code of specified length.
 * @param length Length of the OTP (default is 6)
 */
export const generateOtp = (length: number = 6): string => {
  if (length <= 0) return "";
  
  // Generate random bytes to ensure high entropy
  const digits = "0123456789";
  let otp = "";
  
  for (let i = 0; i < length; i++) {
    const randomIndex = crypto.randomInt(0, digits.length);
    otp += digits[randomIndex];
  }
  
  return otp;
};

/**
 * Hashes an OTP string using SHA-256 for secure database storage.
 * @param otp Plain text OTP
 */
export const hashOtp = (otp: string): string => {
  return crypto.createHash("sha256").update(otp).digest("hex");
};

/**
 * Compares a plain text OTP with a stored SHA-256 hash using a timing-safe comparison.
 * @param otp Plain text OTP received from user
 * @param hashedOtp Stored SHA-256 hash
 */
export const verifyOtp = (otp: string, hashedOtp: string): boolean => {
  const currentHash = hashOtp(otp);
  
  // Timing-safe buffer comparison to prevent timing attacks
  const currentBuffer = Buffer.from(currentHash, "hex");
  const storedBuffer = Buffer.from(hashedOtp, "hex");
  
  if (currentBuffer.length !== storedBuffer.length) {
    return false;
  }
  
  return crypto.timingSafeEqual(currentBuffer, storedBuffer);
};
