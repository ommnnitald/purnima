import nodemailer from 'nodemailer';
import { ConsultationRecord } from '../db';

/**
 * Escapes HTML characters in user input to prevent HTML injection in email clients.
 */
function escapeHtml(text?: string | null): string {
  if (!text) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Strips carriage returns and newlines to prevent email header injection.
 */
function sanitizeHeader(text?: string | null): string {
  if (!text) return '';
  return String(text).replace(/[\r\n]/g, '').trim();
}

/**
 * Creates Nodemailer transporter dynamically using process.env settings.
 */
function getTransporter() {
  const user = process.env.GMAIL_USER || 'ommnnitald@gmail.com';
  const pass = process.env.GMAIL_APP_PASSWORD;

  if (!pass || pass.includes('your_gmail_app_password')) {
    return null;
  }

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user,
      pass,
    },
  });
}

export interface EmailSendResult {
  adminEmailSent: boolean;
  userEmailSent: boolean;
  errors: string[];
}

/**
 * Sends Admin Notification Email and User Auto-Reply Email for a Contact / Consultation Request.
 */
export async function sendContactEmails(record: ConsultationRecord): Promise<EmailSendResult> {
  const result: EmailSendResult = {
    adminEmailSent: false,
    userEmailSent: false,
    errors: [],
  };

  const transporter = getTransporter();

  if (!transporter) {
    const warnMsg = '[emailService] Gmail App Password not configured (GMAIL_APP_PASSWORD missing or placeholder). Email dispatch skipped.';
    console.warn(warnMsg);
    result.errors.push(warnMsg);
    return result;
  }

  const senderEmail = process.env.GMAIL_USER || 'ommnnitald@gmail.com';
  const receiverEmail = process.env.CONTACT_RECEIVER || 'ommnnitald@gmail.com';

  const cleanName = sanitizeHeader(record.fullName);
  const cleanEmail = sanitizeHeader(record.email);
  const cleanContact = sanitizeHeader(record.contact);
  const cleanCity = escapeHtml(record.city);
  const cleanPropertyType = escapeHtml(record.propertyType);
  const cleanBudget = escapeHtml(record.budget);
  const cleanMode = escapeHtml(record.consultationMode || 'studio');
  const cleanDate = escapeHtml(record.preferredDate || 'Not specified');
  const cleanSlot = escapeHtml(record.preferredTimeSlot || 'Not specified');
  const cleanScope = escapeHtml(record.scopeNotes || 'None provided');
  const refCode = sanitizeHeader(record.referenceCode);

  const formattedDate = new Date(record.createdAt).toLocaleString('en-IN', {
    dateStyle: 'full',
    timeStyle: 'short',
    timeZone: 'Asia/Kolkata',
  });

  // --- 1. ADMIN NOTIFICATION EMAIL ---
  const adminMailOptions = {
    from: `"Purnima S Web Portal" <${senderEmail}>`,
    to: receiverEmail,
    replyTo: cleanEmail,
    subject: `New Contact Request - ${cleanName} [${refCode}]`,
    html: `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f7f5f0; margin: 0; padding: 20px; color: #1d1625; }
        .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e0d8d0; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
        .header { background: #1d1625; color: #ffffff; padding: 24px; text-align: center; }
        .header h1 { margin: 0; font-size: 22px; letter-spacing: 0.5px; font-weight: 500; }
        .header p { margin: 6px 0 0 0; color: #D4AF37; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; }
        .content { padding: 28px; }
        .badge { display: inline-block; background-color: #F2EFE9; color: #1d1625; padding: 6px 12px; border-radius: 20px; font-size: 12px; font-weight: bold; margin-bottom: 20px; border: 1px solid #cbc4cc; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
        th, td { padding: 12px 14px; text-align: left; border-bottom: 1px solid #f0eae1; font-size: 14px; }
        th { background-color: #faf8f5; color: #49454b; font-weight: 600; width: 35%; }
        td { color: #1d1625; font-weight: 500; }
        .notes-box { background: #faf8f5; border-left: 4px solid #D4AF37; padding: 16px; border-radius: 4px; font-size: 14px; color: #333333; margin-top: 10px; white-space: pre-wrap; }
        .footer { background: #1d1625; color: #cbc4cc; padding: 16px; text-align: center; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>PURNIMA S</h1>
          <p>New Contact & Consultation Request</p>
        </div>
        <div class="content">
          <div class="badge">Reference: ${refCode}</div>
          <table>
            <tr>
              <th>Client Name</th>
              <td><strong>${escapeHtml(cleanName)}</strong></td>
            </tr>
            <tr>
              <th>Email Address</th>
              <td><a href="mailto:${cleanEmail}" style="color: #1d1625; text-decoration: underline;">${escapeHtml(cleanEmail)}</a></td>
            </tr>
            <tr>
              <th>Phone / WhatsApp</th>
              <td><a href="tel:${cleanContact}" style="color: #1d1625; text-decoration: underline;">${escapeHtml(cleanContact)}</a></td>
            </tr>
            <tr>
              <th>City / Location</th>
              <td>${cleanCity}</td>
            </tr>
            <tr>
              <th>Property Typology</th>
              <td>${cleanPropertyType}</td>
            </tr>
            <tr>
              <th>Estimated Budget</th>
              <td>${cleanBudget}</td>
            </tr>
            <tr>
              <th>Meeting Mode</th>
              <td><span style="text-transform: capitalize;">${cleanMode}</span> Consultation</td>
            </tr>
            <tr>
              <th>Preferred Date / Slot</th>
              <td>${cleanDate} (${cleanSlot})</td>
            </tr>
            <tr>
              <th>Submission Time</th>
              <td>${formattedDate}</td>
            </tr>
          </table>

          <div style="font-weight: 600; font-size: 14px; color: #1d1625; margin-top: 16px;">Client Notes & Requirements:</div>
          <div class="notes-box">${cleanScope}</div>
        </div>
        <div class="footer">
          Direct Lead Notification • Purnima S Interiors & Exteriors Private Limited
        </div>
      </div>
    </body>
    </html>
    `,
  };

  try {
    const adminInfo = await transporter.sendMail(adminMailOptions);
    console.log(`[emailService] Admin email sent successfully. MessageId: ${adminInfo.messageId}`);
    result.adminEmailSent = true;
  } catch (err: any) {
    const errText = `[emailService] Failed to send admin email: ${err.message}`;
    console.error(errText, err);
    result.errors.push(errText);
  }

  // --- 2. USER CONFIRMATION AUTO-REPLY EMAIL ---
  const userMailOptions = {
    from: `"Purnima S Interiors & Exteriors" <${senderEmail}>`,
    to: cleanEmail,
    subject: `Thank you for contacting Purnima S Interiors & Exteriors [Ref: ${refCode}]`,
    html: `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f7f5f0; margin: 0; padding: 20px; color: #1d1625; }
        .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e0d8d0; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
        .header { background: #1d1625; color: #ffffff; padding: 28px 24px; text-align: center; }
        .header h1 { margin: 0; font-size: 24px; letter-spacing: 1px; font-weight: 500; }
        .header p { margin: 6px 0 0 0; color: #D4AF37; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 1.5px; }
        .content { padding: 32px 28px; line-height: 1.6; }
        .greeting { font-size: 18px; font-weight: 600; color: #1d1625; margin-bottom: 12px; }
        .card { background: #faf8f5; border: 1px solid #e8e2d8; border-radius: 12px; padding: 20px; margin: 20px 0; font-size: 14px; }
        .card-row { display: flex; justify-content: space-between; margin-bottom: 8px; border-bottom: 1px solid #eee7dd; padding-bottom: 8px; }
        .card-row:last-child { margin-bottom: 0; border-bottom: none; padding-bottom: 0; }
        .footer { background: #1d1625; color: #cbc4cc; padding: 20px; text-align: center; font-size: 12px; line-height: 1.5; }
        .gold-accent { color: #D4AF37; font-weight: 600; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>PURNIMA S</h1>
          <p>Interiors & Exteriors Private Limited</p>
        </div>
        <div class="content">
          <div class="greeting">Dear ${escapeHtml(cleanName)},</div>
          <p style="font-size: 14px; color: #49454b;">
            Thank you for reaching out to <strong>Purnima S Interiors & Exteriors</strong>. Your consultation request has been logged under Reference ID: <strong style="color: #1d1625;">${refCode}</strong>.
          </p>
          <p style="font-size: 14px; color: #49454b;">
            Our lead directors, <strong>Sudhanshu Sonkar & Purnima Sonkar</strong>, have received your inquiry and our team will get in touch with you at <strong>${escapeHtml(cleanContact)}</strong> within 24 business hours.
          </p>

          <div class="card">
            <div style="font-weight: 600; color: #1d1625; margin-bottom: 12px; border-bottom: 1px solid #D4AF37; padding-bottom: 6px;">
              Request Details Summary
            </div>
            <div style="margin-bottom: 6px;"><strong>Reference ID:</strong> ${refCode}</div>
            <div style="margin-bottom: 6px;"><strong>Property Typology:</strong> ${cleanPropertyType}</div>
            <div style="margin-bottom: 6px;"><strong>Location:</strong> ${cleanCity}</div>
            <div style="margin-bottom: 6px;"><strong>Budget Allocation:</strong> ${cleanBudget}</div>
            <div><strong>Meeting Mode:</strong> <span style="text-transform: capitalize;">${cleanMode}</span></div>
          </div>

          <p style="font-size: 13px; color: #666666; font-style: italic;">
            Note: If you have any urgent changes or additional layout drawings to share, simply reply directly to this email and our team will receive it immediately.
          </p>
        </div>
        <div class="footer">
          <div><strong>Registered Office:</strong> 291/A, Police Line Road, Vikas Nagar, Raebareli, UP - 229001</div>
          <div style="margin-top: 4px;">GST: 09AARCP3551H1Z0 • Strict 45-Day Handover Protocol</div>
        </div>
      </div>
    </body>
    </html>
    `,
  };

  try {
    const userInfo = await transporter.sendMail(userMailOptions);
    console.log(`[emailService] User confirmation email sent successfully. MessageId: ${userInfo.messageId}`);
    result.userEmailSent = true;
  } catch (err: any) {
    const errText = `[emailService] Failed to send user confirmation email: ${err.message}`;
    console.error(errText, err);
    result.errors.push(errText);
  }

  return result;
}
