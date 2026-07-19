/**
 * Generates a secure, cryptographically random numeric OTP code of specified length.
 * @param length Length of the OTP (default is 6)
 */
export declare const generateOtp: (length?: number) => string;
/**
 * Hashes an OTP string using SHA-256 for secure database storage.
 * @param otp Plain text OTP
 */
export declare const hashOtp: (otp: string) => string;
/**
 * Compares a plain text OTP with a stored SHA-256 hash using a timing-safe comparison.
 * @param otp Plain text OTP received from user
 * @param hashedOtp Stored SHA-256 hash
 */
export declare const verifyOtp: (otp: string, hashedOtp: string) => boolean;
//# sourceMappingURL=otp.d.ts.map