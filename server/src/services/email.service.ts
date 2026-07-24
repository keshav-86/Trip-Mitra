import nodemailer from "nodemailer";

export interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export interface IEmailProvider {
  sendEmail(options: SendEmailOptions): Promise<void>;
}

class BrevoProvider implements IEmailProvider {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER!,
        pass: process.env.SMTP_PASS!,
      },
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 10000,
    });

    this.transporter.verify((error) => {
      if (error) {
        console.error("❌ SMTP VERIFY FAILED");
        console.error(error);
      } else {
        console.log("✅ SMTP VERIFIED SUCCESSFULLY");
      }
    });
  }

  async sendEmail(options: SendEmailOptions): Promise<void> {
    console.log("📨 About to send email...");
    console.log("To:", options.to);

    try {
      const info = await this.transporter.sendMail({
        from: `TripMitra <${process.env.EMAIL_FROM}>`,
        to: options.to,
        subject: options.subject,
        text: options.text,
        html: options.html,
      });

      console.log("✅ EMAIL SENT SUCCESSFULLY");
      console.log("Message ID:", info.messageId);
      console.log("Response:", info.response);
    } catch (error: any) {
      console.error("❌ EMAIL SEND FAILED");
      console.error("Message:", error.message);
      console.error("Code:", error.code);
      console.error("Command:", error.command);
      console.error("Response:", error.response);
      console.error("Response Code:", error.responseCode);
      throw error;
    }
  }
}

class EmailService {
  constructor(private provider: IEmailProvider) {}

  async sendEmail(options: SendEmailOptions): Promise<void> {
    await this.provider.sendEmail(options);
  }

  async sendOtpEmail(
    to: string,
    fullName: string,
    otp: string
  ): Promise<void> {
    const subject = `${otp} is your TripMitra Verification Code`;

    const text = `Hello ${fullName},

Your TripMitra verification code is ${otp}.

This code is valid for 10 minutes.

Regards,
TripMitra Team`;

    const html = `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2>TripMitra Email Verification</h2>

        <p>Hello <b>${fullName}</b>,</p>

        <p>Your verification code is:</p>

        <h1 style="letter-spacing:8px;color:#2563eb;text-align:center;">
          ${otp}
        </h1>

        <p>This OTP is valid for <b>10 minutes</b>.</p>

        <p>If you didn't request this email, please ignore it.</p>

        <hr>

        <small>© ${new Date().getFullYear()} TripMitra</small>
      </div>
    `;

    await this.sendEmail({
      to,
      subject,
      html,
      text,
    });
  }
}

export const emailService = new EmailService(
  new BrevoProvider()
);