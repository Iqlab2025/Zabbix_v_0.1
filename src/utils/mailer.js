import dotenv from 'dotenv';
dotenv.config();

import dns from 'dns';
import nodemailer from 'nodemailer';

// Patch DNS.lookup to force IPv4 and array return format
const originalLookup = dns.lookup;
dns.lookup = function (hostname, options, callback) {
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }

  originalLookup(hostname, { ...options, family: 4, all: true }, callback);
};

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST, // e.g., smtp.office365.com
  port: Number(process.env.SMTP_PORT), // 587
  secure: false, // STARTTLS
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false, // Optional (remove in prod)
  },
});

export const sendLicenseExpiryAlert = async ({ to, clientId, expiryDate }) => {
  await transporter.sendMail({
    from: `"Zabbix License System" <${process.env.EMAIL_USER}>`,
    to,
    subject: `🔔 License Expiry Warning for Client: ${clientId}`,
    html: `
      <div style="font-family: sans-serif">
        <h2>⏳ License Expiry Notification</h2>
        <p>Hello,</p>
        <p>This is a reminder that the license for <strong>${clientId}</strong> is set to expire on <strong>${new Date(expiryDate).toDateString()}</strong>.</p>
        <p>Please take appropriate action to renew the license and avoid service disruption.</p>
        <p>Regards,<br><strong>Compliance Team</strong><br>Identiqa Technologies</p>
      </div>
    `,
  });
};
