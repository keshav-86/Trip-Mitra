import { Request, Response, NextFunction } from "express";
/**
 * Clean, production-ready, dependency-free in-memory rate limiting middleware.
 * Tracks requests by IP address combined with the route path.
 */
export declare const rateLimiter: (options: {
    windowMs: number;
    max: number;
    message: string;
}) => (req: Request, res: Response, next: NextFunction) => void | Response<any, Record<string, any>>;
//# sourceMappingURL=rateLimiter.middleware.d.ts.map