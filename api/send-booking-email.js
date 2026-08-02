const nodemailer = require("nodemailer");

const BRAND = {
  name: "Pabudu Tours",
  green: "#012c13",
  gold: "#b8954a",
  phoneDisplay: "+94 77 900 88 03",
  phoneWhatsApp: "94779008803",
  email: "Pabudutour@gmail.com",
  address: "No: 439/2 Managala Rd, Kuda Waskaduwa, Waskaduwa, Kalutara, Sri Lanka",
  site: "https://www.pabudutours.com",
};

const DEFAULT_ADMIN_EMAILS = [
  "Pabudutour@gmail.com"
];

const ALLOWED_ORIGINS = [
  "https://www.pabudutours.com",
  "https://pabudutours.com",
  "http://localhost:4200",
  "http://127.0.0.1:4200",
];

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatDate(value) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return escapeHtml(value);
  return escapeHtml(date.toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" }));
}

function formatMoney(total) {
  const num = Number(total);
  if (Number.isFinite(num)) {
    return `$${num.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
  }
  return `$${escapeHtml(total)}`;
}

function getAdminEmails() {
  const fromEnv = (process.env.ADMIN_EMAILS || "")
    .split(",")
    .map((e) => e.trim())
    .filter(Boolean);
  return fromEnv.length ? fromEnv : DEFAULT_ADMIN_EMAILS;
}

function setCors(req, res) {
  const origin = req.headers.origin;
  if (origin && ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  } else if (!origin) {
    // same-origin / server-to-server
    res.setHeader("Access-Control-Allow-Origin", BRAND.site);
  }
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Vary", "Origin");
}

module.exports = async function handler(req, res) {
  setCors(req, res);

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  const {
    firstName,
    lastName,
    email,
    phone,
    country,
    travelers,
    tour,
    orderNumber,
    total,
    bookingDate,
    travelDate,
  } = req.body || {};

  if (!firstName || !email || !orderNumber || !tour) {
    return res.status(400).json({
      success: false,
      message: "Missing required booking fields",
    });
  }

  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error("EMAIL_USER / EMAIL_PASS env vars are not set");
    return res.status(500).json({
      success: false,
      message: "Email service is not configured",
    });
  }

  const tourTitle = tour?.title || "Tour";
  const tourDuration = tour?.duration || "N/A";
  const safe = {
    firstName: escapeHtml(firstName),
    lastName: escapeHtml(lastName || ""),
    email: escapeHtml(email),
    phone: escapeHtml(phone || "—"),
    country: escapeHtml(country || "—"),
    travelers: escapeHtml(travelers ?? "—"),
    orderNumber: escapeHtml(orderNumber),
    tourTitle: escapeHtml(tourTitle),
    tourDuration: escapeHtml(tourDuration),
    total: formatMoney(total),
    bookingDate: formatDate(bookingDate),
    travelDate: formatDate(travelDate),
  };

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

    const adminEmails = getAdminEmails();

    const adminMail = {
      from: `"${BRAND.name} Booking" <${process.env.EMAIL_USER}>`,
      to: adminEmails,
      replyTo: email,
      subject: `New Booking Received - ${orderNumber}`,
      html: `
      <div style="font-family: Arial, Helvetica, sans-serif; background-color: #f4f6f8; padding: 30px;">
        <div style="max-width: 700px; margin: auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
          <div style="background-color: ${BRAND.green}; padding: 20px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 22px;">New Booking Notification</h1>
            <p style="color: ${BRAND.gold}; margin: 5px 0 0; font-size: 14px;">${BRAND.name} – Booking System</p>
          </div>

          <div style="padding: 30px;">
            <p style="font-size: 16px; margin-bottom: 20px;">
              A new tour booking has been placed. Please review the details below:
            </p>

            <table style="width: 100%; border-collapse: collapse; margin-bottom: 25px;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">Order Number:</td>
                <td>${safe.orderNumber}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">Booking Date:</td>
                <td>${safe.bookingDate}</td>
              </tr>
            </table>

            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 25px 0;" />

            <h2 style="font-size: 18px; margin-bottom: 15px; color: ${BRAND.green};">Customer Information</h2>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 25px;">
              <tr><td style="padding: 6px 0; font-weight: bold;">Full Name:</td><td>${safe.firstName} ${safe.lastName}</td></tr>
              <tr><td style="padding: 6px 0; font-weight: bold;">Email:</td><td>${safe.email}</td></tr>
              <tr><td style="padding: 6px 0; font-weight: bold;">Phone:</td><td>${safe.phone}</td></tr>
              <tr><td style="padding: 6px 0; font-weight: bold;">Country:</td><td>${safe.country}</td></tr>
              <tr><td style="padding: 6px 0; font-weight: bold;">Travelers:</td><td>${safe.travelers}</td></tr>
            </table>

            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 25px 0;" />

            <h2 style="font-size: 18px; margin-bottom: 15px; color: ${BRAND.green};">Tour Details</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 6px 0; font-weight: bold;">Tour Name:</td><td>${safe.tourTitle}</td></tr>
              <tr><td style="padding: 6px 0; font-weight: bold;">Duration:</td><td>${safe.tourDuration}</td></tr>
              <tr><td style="padding: 6px 0; font-weight: bold;">Travel Date:</td><td>${safe.travelDate}</td></tr>
              <tr><td style="padding: 6px 0; font-weight: bold;">Total Amount:</td><td style="color: ${BRAND.gold}; font-weight: bold;">${safe.total}</td></tr>
            </table>

            <p style="margin-top: 30px; font-size: 14px; color: #6b7280;">
              Please review this booking and proceed with confirmation and tour arrangements.
            </p>
          </div>

          <div style="background-color: #f1f5f9; padding: 15px; text-align: center; font-size: 12px; color: #6b7280;">
            © ${new Date().getFullYear()} ${BRAND.name}. All rights reserved.
          </div>
        </div>
      </div>
      `,
    };

    const customerMail = {
      from: `"${BRAND.name}" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Thank you for your booking! - ${tourTitle}`,
      html: `
      <div style="margin:0;padding:0;background-color:#f4f6f8;font-family:Arial,Helvetica,sans-serif;">
        <div style="max-width:700px;margin:40px auto;background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 4px 10px rgba(0,0,0,0.05);">
          <div style="background-color:${BRAND.green};padding:25px;text-align:center;">
            <h1 style="color:#ffffff;margin:0;font-size:22px;">Booking Confirmation</h1>
            <p style="color:${BRAND.gold};margin:5px 0 0;font-size:14px;">${BRAND.name} – Sri Lanka</p>
          </div>

          <div style="padding:30px;color:#333;">
            <p style="font-size:16px;">Dear ${safe.firstName},</p>
            <p style="font-size:15px;line-height:1.6;">
              Thank you for choosing <strong>${BRAND.name}</strong>.
              Your booking has been successfully received. Below are your booking details for your reference.
            </p>

            <h2 style="font-size:18px;margin-top:25px;color:${BRAND.green};">Booking Summary</h2>
            <table style="width:100%;border-collapse:collapse;margin-top:15px;">
              <tr>
                <td style="padding:10px;border:1px solid #e5e7eb;font-weight:bold;">Order Number</td>
                <td style="padding:10px;border:1px solid #e5e7eb;">${safe.orderNumber}</td>
              </tr>
              <tr>
                <td style="padding:10px;border:1px solid #e5e7eb;font-weight:bold;">Tour</td>
                <td style="padding:10px;border:1px solid #e5e7eb;">${safe.tourTitle}</td>
              </tr>
              <tr>
                <td style="padding:10px;border:1px solid #e5e7eb;font-weight:bold;">Duration</td>
                <td style="padding:10px;border:1px solid #e5e7eb;">${safe.tourDuration}</td>
              </tr>
              <tr>
                <td style="padding:10px;border:1px solid #e5e7eb;font-weight:bold;">Travel Date</td>
                <td style="padding:10px;border:1px solid #e5e7eb;">${safe.travelDate}</td>
              </tr>
              <tr>
                <td style="padding:10px;border:1px solid #e5e7eb;font-weight:bold;">Booking Date</td>
                <td style="padding:10px;border:1px solid #e5e7eb;">${safe.bookingDate}</td>
              </tr>
              <tr>
                <td style="padding:10px;border:1px solid #e5e7eb;font-weight:bold;">Total Amount</td>
                <td style="padding:10px;border:1px solid #e5e7eb;color:${BRAND.gold};font-weight:bold;">${safe.total}</td>
              </tr>
            </table>

            <p style="margin-top:25px;font-size:15px;line-height:1.6;">
              Our team will contact you shortly with further travel arrangements and important information regarding your tour.
            </p>

            <p style="margin-top:30px;font-size:15px;line-height:1.6;">
              Kind regards,<br/>
              <strong>${BRAND.name} Team</strong><br/>
              ${escapeHtml(BRAND.address)}
            </p>

            <hr style="border:none;border-top:1px solid #e5e7eb;margin:20px 0;" />

            <p style="font-size:14px;line-height:1.6;color:#555;">
              WhatsApp:
              <a href="https://wa.me/${BRAND.phoneWhatsApp}" style="color:${BRAND.green};text-decoration:none;font-weight:bold;">
                ${BRAND.phoneDisplay}
              </a><br/>
              Email:
              <a href="mailto:${BRAND.email}" style="color:${BRAND.green};text-decoration:none;">
                ${BRAND.email}
              </a>
            </p>
          </div>

          <div style="background:#f1f5f9;padding:15px;text-align:center;font-size:12px;color:#6b7280;">
            © ${new Date().getFullYear()} ${BRAND.name}. All rights reserved.
          </div>
        </div>
      </div>
      `,
    };

    await transporter.sendMail(adminMail);
    await transporter.sendMail(customerMail);

    return res.status(200).json({
      success: true,
      message: "Email sent successfully",
    });
  } catch (error) {
    console.error("Email error:", error);
    return res.status(500).json({
      success: false,
      message: "Error sending email",
    });
  }
};
