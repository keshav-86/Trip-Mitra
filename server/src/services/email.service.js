"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailService = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
/**
 * Nodemailer provider implementation.
 * Connects to SMTP server configured via environment variables.
 * Fallback to an in-memory/console logger if credentials are not configured.
 */
class NodemailerProvider {
    transporter = null;
    isDevelopmentFallback = false;
    constructor() {
        this.initializeTransporter();
    }
    async initializeTransporter() {
        const service = process.env.SMTP_SERVICE;
        const host = process.env.SMTP_HOST;
        const port = process.env.SMTP_PORT;
        const user = process.env.SMTP_USER;
        const pass = process.env.SMTP_PASS;
        if (user && pass && (service || host)) {
            const config = {
                auth: {
                    user,
                    pass,
                },
            };
            if (service) {
                config.service = service;
            }
            else {
                config.host = host;
                config.port = parseInt(port || "587");
                config.secure = port === "465";
            }
            this.transporter = nodemailer_1.default.createTransport(config);
            this.isDevelopmentFallback = false;
            console.log(`📨 Nodemailer SMTP Transporter initialized successfully via ${service ? 'service: ' + service : 'host: ' + host}.`);
        }
        else {
            this.isDevelopmentFallback = true;
            console.warn("⚠️ SMTP credentials not fully configured. Falling back to Ethereal / Console Email logging.");
        }
    }
    async sendEmail(options) {
        if (this.isDevelopmentFallback) {
            console.log("\n==================================================");
            console.log(`✉️  EMAIL SIMULATION (Development Mode)`);
            console.log(`To: ${options.to}`);
            console.log(`Subject: ${options.subject}`);
            console.log(`Body (Text): ${options.text || "See HTML content"}`);
            console.log(`--------------------- HTML ---------------------`);
            console.log(options.html);
            console.log("==================================================\n");
            // Attempt to send using Ethereal email for test inbox inspection if possible, non-blocking
            try {
                const testAccount = await nodemailer_1.default.createTestAccount();
                const testTransporter = nodemailer_1.default.createTransport({
                    host: "smtp.ethereal.email",
                    port: 587,
                    secure: false,
                    auth: {
                        user: testAccount.user,
                        pass: testAccount.pass,
                    },
                });
                const info = await testTransporter.sendMail({
                    from: '"TripMitra Support" <no-reply@tripmitra.com>',
                    to: options.to,
                    subject: options.subject,
                    text: options.text,
                    html: options.html,
                });
                console.log(`✨ Ethereal Email Preview URL: ${nodemailer_1.default.getTestMessageUrl(info)}`);
            }
            catch (err) {
                console.warn("Couldn't generate Ethereal preview link, console log is primary:", err);
            }
            return;
        }
        if (!this.transporter) {
            await this.initializeTransporter();
        }
        if (!this.transporter) {
            throw new Error("Transporter could not be initialized.");
        }
        await this.transporter.sendMail({
            from: process.env.SMTP_FROM || '"TripMitra Support" <no-reply@tripmitra.com>',
            to: options.to,
            subject: options.subject,
            text: options.text,
            html: options.html,
        });
    }
}
/**
 * Isolated Email Service wrapping the selected provider.
 * Allows easy switching to Resend, Brevo, or other providers.
 */
class EmailService {
    provider;
    constructor(provider) {
        this.provider = provider;
    }
    setProvider(provider) {
        this.provider = provider;
    }
    async sendEmail(options) {
        await this.provider.sendEmail(options);
    }
    /**
     * Helper method to send OTP verification email.
     */
    async sendOtpEmail(to, fullName, otp) {
        const subject = `${otp} is your TripMitra Verification Code`;
        const text = `Hello ${fullName},\n\nYour TripMitra verification code is ${otp}. This code is valid for 10 minutes.\n\nBest regards,\nTripMitra Team`;
        const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Verify Your Email</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            background-color: #f8fafc;
            color: #0f172a;
            margin: 0;
            padding: 0;
            -webkit-text-size-adjust: none;
            -ms-text-size-adjust: none;
          }
          .container {
            max-width: 500px;
            margin: 40px auto;
            padding: 32px;
            background-color: #ffffff;
            border-radius: 24px;
            border: 1px solid #f1f5f9;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05);
          }
          .logo {
            text-align: center;
            margin-bottom: 24px;
          }
          .logo-text {
            font-size: 24px;
            font-weight: 800;
            letter-spacing: -0.05em;
            background: linear-gradient(135deg, #2563eb 0%, #10b981 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            display: inline-block;
          }
          h1 {
            font-size: 20px;
            font-weight: 700;
            text-align: center;
            margin-bottom: 8px;
            color: #0f172a;
          }
          p {
            font-size: 14px;
            line-height: 24px;
            color: #64748b;
            text-align: center;
            margin-top: 0;
          }
          .otp-container {
            text-align: center;
            margin: 32px 0;
          }
          .otp-code {
            font-size: 36px;
            font-weight: 800;
            letter-spacing: 0.25em;
            color: #2563eb;
            background-color: #f0fdf4;
            border: 1px dashed #10b981;
            padding: 16px 24px;
            border-radius: 16px;
            display: inline-block;
          }
          .footer {
            margin-top: 32px;
            padding-top: 24px;
            border-top: 1px solid #f1f5f9;
            text-align: center;
          }
          .footer-text {
            font-size: 11px;
            color: #94a3b8;
            line-height: 18px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="logo">
            <span class="logo-text">TripMitra</span>
          </div>
          <h1>Verify your email address</h1>
          <p>Hello ${fullName}, welcome to TripMitra! Use the verification code below to verify your email and activate your account.</p>
          <div class="otp-container">
            <span class="otp-code">${otp}</span>
          </div>
          <p>This verification code is valid for <strong>10 minutes</strong>. If you did not request this code, please ignore this email.</p>
          <div class="footer">
            <p class="footer-text">
              © ${new Date().getFullYear()} TripMitra. All rights reserved.<br>
              This is an automated system email. Please do not reply directly.
            </p>
          </div>
        </div>
      </body>
      </html>
    `;
        await this.sendEmail({ to, subject, html, text });
    }
}
// Export a single instance with NodemailerProvider as the default
exports.emailService = new EmailService(new NodemailerProvider());
//# sourceMappingURL=email.service.js.map