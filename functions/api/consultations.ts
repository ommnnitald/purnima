import nodemailer from 'nodemailer';

interface Env {
  GMAIL_USER?: string;
  GMAIL_APP_PASSWORD?: string;
  CONTACT_RECEIVER?: string;
}

function escapeHtml(text?: string | null): string {
  if (!text) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function sanitizeHeader(text?: string | null): string {
  if (!text) return '';
  return String(text).replace(/[\r\n]/g, '').trim();
}

export const onRequestPost = async (context: { request: Request; env: Env }) => {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Content-Type': 'application/json',
  };

  try {
    const body = (await context.request.json()) as any;
    const {
      fullName,
      email,
      contact,
      city,
      propertyType,
      budget,
      scopeNotes,
      preferredDate,
      preferredTimeSlot,
      consultationMode,
    } = body || {};

    if (!fullName || !email || !contact) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Full Name, Email, and Contact Number are required fields.',
        }),
        { status: 400, headers: corsHeaders }
      );
    }

    const refCode = `PS-${Math.floor(100000 + Math.random() * 900000)}`;
    const id = `CONS-${Date.now()}`;
    const createdAt = new Date().toISOString();

    const record = {
      id,
      referenceCode: refCode,
      fullName: String(fullName).trim(),
      email: String(email).trim(),
      contact: String(contact).trim(),
      city: city ? String(city).trim() : 'Raebareli',
      propertyType: propertyType ? String(propertyType).trim() : '3/4 BHK Luxury Residence',
      budget: budget ? String(budget).trim() : '₹25L – ₹40L (Premium Full Interior)',
      scopeNotes: scopeNotes ? String(scopeNotes).trim() : '',
      preferredDate: preferredDate ? String(preferredDate).trim() : '',
      preferredTimeSlot: preferredTimeSlot ? String(preferredTimeSlot).trim() : '11:00 AM – 01:00 PM',
      consultationMode: consultationMode || 'studio',
      status: 'Pending',
      createdAt,
      updatedAt: createdAt,
    };

    const gmailUser = context.env.GMAIL_USER || 'ommnnitald@gmail.com';
    const gmailPass = context.env.GMAIL_APP_PASSWORD || 'ynko cfoj uash ooyy';
    const receiverEmail = context.env.CONTACT_RECEIVER || 'ommnnitald@gmail.com';

    let adminEmailSent = false;
    let userEmailSent = false;
    const emailErrors: string[] = [];

    if (gmailPass && !gmailPass.includes('your_gmail_app_password')) {
      try {
        const transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 465,
          secure: true,
          auth: {
            user: gmailUser,
            pass: gmailPass,
          },
          connectionTimeout: 10000,
          greetingTimeout: 10000,
          socketTimeout: 10000,
        });

        const cleanName = sanitizeHeader(record.fullName);
        const cleanEmail = sanitizeHeader(record.email);
        const cleanContact = sanitizeHeader(record.contact);
        const cleanCity = escapeHtml(record.city);
        const cleanPropertyType = escapeHtml(record.propertyType);
        const cleanBudget = escapeHtml(record.budget);
        const cleanMode = escapeHtml(record.consultationMode);
        const cleanDate = escapeHtml(record.preferredDate || 'Not specified');
        const cleanSlot = escapeHtml(record.preferredTimeSlot || 'Not specified');
        const cleanScope = escapeHtml(record.scopeNotes || 'None provided');

        const formattedDate = new Date(createdAt).toLocaleString('en-IN', {
          dateStyle: 'full',
          timeStyle: 'short',
          timeZone: 'Asia/Kolkata',
        });

        // 1. Admin Email
        try {
          await transporter.sendMail({
            from: `"Purnima S Web Portal" <${gmailUser}>`,
            to: receiverEmail,
            replyTo: cleanEmail,
            subject: `New Contact Request - ${cleanName} [${refCode}]`,
            html: `
            <!DOCTYPE html>
            <html>
            <head><meta charset="utf-8"></head>
            <body style="font-family: Arial, sans-serif; background-color: #f7f5f0; margin: 0; padding: 20px; color: #1d1625;">
              <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e0d8d0;">
                <div style="background: #1d1625; color: #ffffff; padding: 24px; text-align: center;">
                  <h1 style="margin: 0; font-size: 22px;">PURNIMA S</h1>
                  <p style="margin: 6px 0 0 0; color: #D4AF37; font-size: 13px; font-weight: bold; text-transform: uppercase;">New Contact & Consultation Request</p>
                </div>
                <div style="padding: 28px;">
                  <div style="display: inline-block; background-color: #F2EFE9; color: #1d1625; padding: 6px 12px; border-radius: 20px; font-size: 12px; font-weight: bold; margin-bottom: 20px;">Reference: ${refCode}</div>
                  <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
                    <tr><td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; width: 35%;">Client Name</td><td style="padding: 10px; border-bottom: 1px solid #eee;">${cleanName}</td></tr>
                    <tr><td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Email</td><td style="padding: 10px; border-bottom: 1px solid #eee;"><a href="mailto:${cleanEmail}">${cleanEmail}</a></td></tr>
                    <tr><td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Phone</td><td style="padding: 10px; border-bottom: 1px solid #eee;"><a href="tel:${cleanContact}">${cleanContact}</a></td></tr>
                    <tr><td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">City</td><td style="padding: 10px; border-bottom: 1px solid #eee;">${cleanCity}</td></tr>
                    <tr><td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Property Type</td><td style="padding: 10px; border-bottom: 1px solid #eee;">${cleanPropertyType}</td></tr>
                    <tr><td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Budget</td><td style="padding: 10px; border-bottom: 1px solid #eee;">${cleanBudget}</td></tr>
                    <tr><td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Meeting Mode</td><td style="padding: 10px; border-bottom: 1px solid #eee;">${cleanMode}</td></tr>
                    <tr><td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Preferred Date / Slot</td><td style="padding: 10px; border-bottom: 1px solid #eee;">${cleanDate} (${cleanSlot})</td></tr>
                    <tr><td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Submission Time</td><td style="padding: 10px; border-bottom: 1px solid #eee;">${formattedDate}</td></tr>
                  </table>
                  <div style="font-weight: bold; margin-bottom: 8px;">Client Notes & Requirements:</div>
                  <div style="background: #faf8f5; border-left: 4px solid #D4AF37; padding: 16px; border-radius: 4px; font-size: 14px; white-space: pre-wrap;">${cleanScope}</div>
                </div>
                <div style="background: #1d1625; color: #cbc4cc; padding: 16px; text-align: center; font-size: 12px;">
                  Direct Lead Notification • Purnima S Interiors & Exteriors Private Limited
                </div>
              </div>
            </body>
            </html>
            `,
          });
          adminEmailSent = true;
        } catch (err: any) {
          console.error('Failed to send admin email in Cloudflare function:', err);
          emailErrors.push(`Admin email error: ${err.message || String(err)}`);
        }

        // 2. User Auto-Reply Email
        try {
          await transporter.sendMail({
            from: `"Purnima S Interiors & Exteriors" <${gmailUser}>`,
            to: cleanEmail,
            subject: `Thank you for contacting Purnima S Interiors & Exteriors [Ref: ${refCode}]`,
            html: `
            <!DOCTYPE html>
            <html>
            <head><meta charset="utf-8"></head>
            <body style="font-family: Arial, sans-serif; background-color: #f7f5f0; margin: 0; padding: 20px; color: #1d1625;">
              <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e0d8d0;">
                <div style="background: #1d1625; color: #ffffff; padding: 28px 24px; text-align: center;">
                  <h1 style="margin: 0; font-size: 24px;">PURNIMA S</h1>
                  <p style="margin: 6px 0 0 0; color: #D4AF37; font-size: 12px; font-weight: bold; text-transform: uppercase;">Interiors & Exteriors Private Limited</p>
                </div>
                <div style="padding: 32px 28px; line-height: 1.6;">
                  <div style="font-size: 18px; font-weight: bold; margin-bottom: 12px;">Dear ${cleanName},</div>
                  <p style="font-size: 14px; color: #49454b;">
                    Thank you for reaching out to <strong>Purnima S Interiors & Exteriors</strong>. Your consultation request has been logged under Reference ID: <strong>${refCode}</strong>.
                  </p>
                  <p style="font-size: 14px; color: #49454b;">
                    Our lead directors, <strong>Sudhanshu Sonkar & Purnima Sonkar</strong>, have received your inquiry and our team will get in touch with you at <strong>${cleanContact}</strong> within 24 business hours.
                  </p>
                  <div style="background: #faf8f5; border: 1px solid #e8e2d8; border-radius: 12px; padding: 20px; margin: 20px 0; font-size: 14px;">
                    <div style="font-weight: bold; border-bottom: 1px solid #D4AF37; padding-bottom: 6px; margin-bottom: 10px;">Request Details Summary</div>
                    <div style="margin-bottom: 6px;"><strong>Reference ID:</strong> ${refCode}</div>
                    <div style="margin-bottom: 6px;"><strong>Property Typology:</strong> ${cleanPropertyType}</div>
                    <div style="margin-bottom: 6px;"><strong>Location:</strong> ${cleanCity}</div>
                    <div style="margin-bottom: 6px;"><strong>Budget Allocation:</strong> ${cleanBudget}</div>
                    <div><strong>Meeting Mode:</strong> ${cleanMode}</div>
                  </div>
                  <p style="font-size: 13px; color: #666666; font-style: italic;">
                    Note: If you have any urgent changes or additional layout drawings to share, simply reply directly to this email and our team will receive it immediately.
                  </p>
                </div>
                <div style="background: #1d1625; color: #cbc4cc; padding: 20px; text-align: center; font-size: 12px; line-height: 1.5;">
                  <div><strong>Registered Office:</strong> 291/A, Police Line Road, Vikas Nagar, Raebareli, UP - 229001</div>
                  <div style="margin-top: 4px;">GST: 09AARCP3551H1Z0 • Strict 45-Day Handover Protocol</div>
                </div>
              </div>
            </body>
            </html>
            `,
          });
          userEmailSent = true;
        } catch (err: any) {
          console.error('Failed to send user confirmation email in Cloudflare function:', err);
          emailErrors.push(`User email error: ${err.message || String(err)}`);
        }
      } catch (err: any) {
        console.error('Failed to initialize Nodemailer transporter:', err);
        emailErrors.push(`Transporter error: ${err.message || String(err)}`);
      }
    } else {
      emailErrors.push('Gmail credentials not configured in Cloudflare environment');
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Consultation request received successfully',
        data: record,
        emailStatus: {
          adminEmailSent,
          userEmailSent,
          errors: emailErrors,
        },
      }),
      { headers: corsHeaders }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        message: 'Internal server error processing consultation request',
        error: String(error),
      }),
      { status: 500, headers: corsHeaders }
    );
  }
};

export const onRequestOptions = async () => {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    },
  });
};
