import { Resend } from "resend";

export interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export interface IEmailProvider {
  sendEmail(options: SendEmailOptions): Promise<void>;
}

class ResendProvider implements IEmailProvider {
  private resend: Resend;

  constructor() {
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      throw new Error("RESEND_API_KEY is missing.");
    }

    this.resend = new Resend(apiKey);

    console.log("✅ Resend initialized successfully.");
  }

  async sendEmail(options: SendEmailOptions): Promise<void> {
    const { data, error } = await this.resend.emails.send({
  from: "TripMitra <onboarding@resend.dev>",
  to: options.to,
  subject: options.subject,
  html: options.html,
  ...(options.text ? { text: options.text } : {}),
});

    if (error) {
      console.error("❌ Resend Error:", error);
      throw new Error(error.message);
    }

    console.log("✅ Email sent successfully:", data?.id);
  }
}

class EmailService {
  private provider: IEmailProvider;

  constructor(provider: IEmailProvider) {
    this.provider = provider;
  }

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
      <div style="font-family:Arial,sans-serif;padding:20px">
        <h2>TripMitra Email Verification</h2>

        <p>Hello <b>${fullName}</b>,</p>

        <p>Your verification code is:</p>

        <h1 style="
            letter-spacing:8px;
            color:#2563eb;
            text-align:center;
        ">
          ${otp}
        </h1>

        <p>This OTP is valid for <b>10 minutes</b>.</p>

        <p>If you didn't request this email, please ignore it.</p>

        <hr>

        <small>
          © ${new Date().getFullYear()} TripMitra
        </small>
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
  new ResendProvider()
);