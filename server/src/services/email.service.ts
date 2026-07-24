import axios from "axios";

export interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

class EmailService {
  async sendEmail(options: SendEmailOptions): Promise<void> {
    try {
      console.log("📨 Sending email to:", options.to);

      const response = await axios.post(
        "https://api.brevo.com/v3/smtp/email",
        {
          sender: {
            name: "TripMitra",
            email: process.env.EMAIL_FROM,
          },
          to: [
            {
              email: options.to,
            },
          ],
          subject: options.subject,
          htmlContent: options.html,
          textContent: options.text,
        },
        {
          headers: {
            "api-key": process.env.BREVO_API_KEY!,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          timeout: 15000,
        }
      );

      console.log("✅ Email sent successfully");
      console.log(response.data);
    } catch (error: any) {
      console.error("❌ Brevo API Error");

      if (error.response) {
        console.error(error.response.status);
        console.error(error.response.data);
      } else {
        console.error(error.message);
      }

      throw error;
    }
  }

  async sendOtpEmail(
    to: string,
    fullName: string,
    otp: string
  ): Promise<void> {
    const subject = `${otp} is your TripMitra Verification Code`;

    const text = `Hello ${fullName},

Your verification code is ${otp}.

This OTP is valid for 10 minutes.`;

    const html = `
      <div style="font-family:Arial,sans-serif;padding:20px">
        <h2>TripMitra Email Verification</h2>

        <p>Hello <b>${fullName}</b>,</p>

        <p>Your verification code is:</p>

        <h1 style="letter-spacing:8px;color:#2563eb;text-align:center">
          ${otp}
        </h1>

        <p>This OTP is valid for <b>10 minutes</b>.</p>

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

export const emailService = new EmailService();