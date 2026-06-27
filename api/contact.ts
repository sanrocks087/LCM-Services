import type { VercelRequest, VercelResponse } from "@vercel/node";
import * as nodemailer from "nodemailer";

// Add this here
export const config = {
  runtime: "nodejs",
};

interface ContactForm {
  name: string;
  email?: string;
  phone: string;
  buildingName: string;
  message: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
}

const requiredEnv = [
  "SMTP_HOST",
  "SMTP_PORT",
  "SMTP_USER",
  "SMTP_PASS",
  "MAIL_TO",
];

for (const key of requiredEnv) {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
}

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST!,
  port: Number(process.env.SMTP_PORT),
  secure: Number(process.env.SMTP_PORT) === 465,
  auth: {
    user: process.env.SMTP_USER!,
    pass: process.env.SMTP_PASS!,
  },
});

/**
 * Escape HTML special characters to prevent HTML injection in emails.
 */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");

    return res.status(405).json({
      success: false,
      message: "Method Not Allowed",
    });
  }

  try {
    const {
      name,
      email = "",
      phone,
      buildingName,
      message,
    } = req.body as ContactForm;

    if (!name?.trim() || !phone?.trim() || !buildingName?.trim() || !message?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Name, Phone No, Building/Society/Area Name and Message are required.",
      });
    }

    if (phone?.length !== 10) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid 10 digit phone number.",
      });
    }

    // if (!validateEmail(email)) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Please provide a valid email address.",
    //   });
    // }

    const safeName = escapeHtml(name.trim());
    const safeEmail = escapeHtml(email.trim());
    const safePhone = escapeHtml(phone.trim());
    const safebuildingName = escapeHtml(buildingName.trim());
    const safeMessage = escapeHtml(message.trim()).replace(/\n/g, "<br>");

    await transporter.sendMail({
      from: `"LCM Services Website" <${process.env.SMTP_USER}>`,
      to: process.env.MAIL_TO,
      //replyTo: email,
      subject: `New Inquiry - ${safeName}/${safePhone}`,
      text: `
New Contact Form Submission

Name: ${name}

Email: ${email || "N/A"}

Phone: ${phone}

Building Name: ${buildingName}

Message:

${message}
`,

      html: `
<!DOCTYPE html>
<html>
<body style="font-family:Arial,Helvetica,sans-serif;background:#f5f5f5;padding:20px;">
<table style="max-width:700px;background:#ffffff;margin:auto;border-collapse:collapse;border:1px solid #ddd;">

<tr>
<td style="padding:20px;background:#0b5ed7;color:#fff;">
<h2 style="margin:0;">New Contact Form Submission</h2>
</td>
</tr>

<tr>
<td style="padding:20px;">

<table style="width:100%;border-collapse:collapse;">

<tr>
<td style="padding:10px;font-weight:bold;width:150px;">Name</td>
<td>${safeName}</td>
</tr>

<tr>
<td style="padding:10px;font-weight:bold;">Email</td>
<td>${safeEmail}</td>
</tr>

<tr>
<td style="padding:10px;font-weight:bold;">Phone</td>
<td>${safePhone || "-"}</td>
</tr>

<tr>
<td style="padding:10px;font-weight:bold;">Subject</td>
<td>${safebuildingName}</td>
</tr>

<tr>
<td style="padding:10px;font-weight:bold;vertical-align:top;">Message</td>
<td>${safeMessage}</td>
</tr>

</table>

</td>
</tr>

</table>
</body>
</html>
`,
    });

    return res.status(200).json({
      success: true,
      message: "Your message has been sent successfully.",
    });
  } catch (error) {
    console.error("Contact form error:", error);

    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred. Please try again later.",
    });
  }
}