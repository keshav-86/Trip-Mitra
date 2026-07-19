export interface SendEmailOptions {
    to: string;
    subject: string;
    html: string;
    text?: string;
}
export interface IEmailProvider {
    sendEmail(options: SendEmailOptions): Promise<void>;
}
/**
 * Isolated Email Service wrapping the selected provider.
 * Allows easy switching to Resend, Brevo, or other providers.
 */
declare class EmailService {
    private provider;
    constructor(provider: IEmailProvider);
    setProvider(provider: IEmailProvider): void;
    sendEmail(options: SendEmailOptions): Promise<void>;
    /**
     * Helper method to send OTP verification email.
     */
    sendOtpEmail(to: string, fullName: string, otp: string): Promise<void>;
}
export declare const emailService: EmailService;
export {};
//# sourceMappingURL=email.service.d.ts.map