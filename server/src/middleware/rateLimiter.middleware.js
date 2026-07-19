"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rateLimiter = void 0;
const rateLimitStore = new Map();
/**
 * Clean, production-ready, dependency-free in-memory rate limiting middleware.
 * Tracks requests by IP address combined with the route path.
 */
const rateLimiter = (options) => {
    return (req, res, next) => {
        // Determine client IP safely
        const ip = ((Array.isArray(req.headers["x-forwarded-for"])
            ? req.headers["x-forwarded-for"][0]
            : req.headers["x-forwarded-for"]) ||
            req.socket.remoteAddress ||
            "unknown");
        const key = `${req.baseUrl || ""}${req.path}:${ip}`;
        const now = Date.now();
        let clientLimit = rateLimitStore.get(key);
        // If client limit record is missing or expired, reset/create it
        if (!clientLimit || now > clientLimit.resetTime) {
            clientLimit = {
                count: 1,
                resetTime: now + options.windowMs,
            };
            rateLimitStore.set(key, clientLimit);
            // Set rate limit headers
            res.setHeader("X-RateLimit-Limit", options.max);
            res.setHeader("X-RateLimit-Remaining", options.max - 1);
            res.setHeader("X-RateLimit-Reset", Math.ceil(clientLimit.resetTime / 1000));
            return next();
        }
        clientLimit.count++;
        // Set headers
        const remaining = Math.max(0, options.max - clientLimit.count);
        res.setHeader("X-RateLimit-Limit", options.max);
        res.setHeader("X-RateLimit-Remaining", remaining);
        res.setHeader("X-RateLimit-Reset", Math.ceil(clientLimit.resetTime / 1000));
        if (clientLimit.count > options.max) {
            const remainingSeconds = Math.ceil((clientLimit.resetTime - now) / 1000);
            return res.status(429).json({
                success: false,
                message: `${options.message} Please try again in ${remainingSeconds} seconds.`,
            });
        }
        next();
    };
};
exports.rateLimiter = rateLimiter;
//# sourceMappingURL=rateLimiter.middleware.js.map