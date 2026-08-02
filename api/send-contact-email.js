const nodemailer = require("nodemailer");

const ALLOWED_ORIGINS = [
  "https://www.pabudutours.com",
  "https://pabudutours.com",
  "http://localhost:4200",
  "http://127.0.0.1:4200",
];

const DEFAULT_ADMIN_EMAILS = [
  "Pabudutour@gmail.com"
];

function setCors(req, res) {
  const origin = req.headers.origin;
  if (origin && ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  } else if (!origin) {
    res.setHeader("Access-Control-Allow-Origin", "https://www.pabudutours.com");
  }
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Vary", "Origin");
}

function getAdminEmails() {
  const fromEnv = (process.env.ADMIN_EMAILS || "")
    .split(",")
    .map((e) => e.trim())
    .filter(Boolean);
  return fromEnv.length ? fromEnv : DEFAULT_ADMIN_EMAILS;
}

module.exports = async function handler(req, res) {
  setCors(req, res);

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  const { name, email, contactPhone, whatsapp, message } = req.body || {};
  const phone = contactPhone || whatsapp || "";

  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: "Missing required contact fields",
    });
  }

  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error("EMAIL_USER / EMAIL_PASS env vars are not set");
    return res.status(500).json({
      success: false,
      message: "Email service is not configured",
    });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Contact Form" <${process.env.EMAIL_USER}>`,
      replyTo: email,
      to: getAdminEmails(),
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <div style="font-family: Arial, Helvetica, sans-serif;">
          <h2 style="color:#012c13;">Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>WhatsApp / Phone:</strong> ${phone || "—"}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        </div>
      `,
    });

    await transporter.sendMail({
      from: `"Pabudu Tours" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `We received your message, ${name}`,
      html: `
        <div style="font-family: Arial, Helvetica, sans-serif; background: #f9f9f9; padding: 20px;">
          <h2 style="color:#012c13;">Thank you for contacting us, ${name}!</h2>
          <p>We have received your message and will get back to you shortly.</p>
          <p><strong>Your Message:</strong> ${message}</p>
          <p>Best regards,<br/>Pabudu Tours Team</p>
        </div>
      `,
    });

    return res.status(200).json({
      success: true,
      message: "Contact emails sent successfully",
    });
  } catch (error) {
    console.error("Contact email error:", error);
    return res.status(500).json({
      success: false,
      message: "Error sending contact email",
    });
  }
};
