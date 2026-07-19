import { Request, Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
export declare const register: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const login: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const profile: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const updateProfile: (req: AuthRequest, res: Response) => Promise<void>;
export declare const verifyEmail: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const resendOtp: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=auth.controller.d.ts.map