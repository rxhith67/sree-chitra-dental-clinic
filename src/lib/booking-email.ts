import { Resend } from "resend";
import type { BookingFormValues } from "@/lib/booking";

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export function getBookingEmailConfig() {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const fromEmail = process.env.BOOKING_FROM_EMAIL?.trim();
  const bookingEmail = process.env.BOOKING_EMAIL?.trim();

  return {
    apiKey,
    fromEmail,
    bookingEmail,
    isConfigured: Boolean(apiKey && fromEmail && bookingEmail),
  };
}

export function buildBookingEmail(values: BookingFormValues) {
  const safe = {
    fullName: escapeHtml(values.fullName),
    phone: escapeHtml(values.phone),
    email: escapeHtml(values.email),
    appointmentDate: escapeHtml(values.appointmentDate),
    preferredTime: escapeHtml(values.preferredTime),
    service: escapeHtml(values.service),
    message: escapeHtml(values.message),
  };

  return {
    subject: `New booking enquiry from ${values.fullName}`,
    text: [
      "New booking enquiry received",
      `Name: ${values.fullName}`,
      `Phone: ${values.phone}`,
      `Email: ${values.email}`,
      `Preferred date: ${values.appointmentDate}`,
      `Preferred time: ${values.preferredTime}`,
      `Service: ${values.service}`,
      `Message: ${values.message}`,
    ].join("\n"),
    html: `
      <div style="font-family: Arial, Helvetica, sans-serif; color: #0f172a; line-height: 1.6;">
        <h2 style="margin-bottom: 16px;">New booking enquiry received</h2>
        <table style="border-collapse: collapse; width: 100%; max-width: 640px;">
          <tbody>
            <tr><td style="padding: 8px 0; font-weight: 700;">Name</td><td style="padding: 8px 0;">${safe.fullName}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: 700;">Phone</td><td style="padding: 8px 0;">${safe.phone}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: 700;">Email</td><td style="padding: 8px 0;">${safe.email}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: 700;">Preferred date</td><td style="padding: 8px 0;">${safe.appointmentDate}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: 700;">Preferred time</td><td style="padding: 8px 0;">${safe.preferredTime}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: 700;">Service</td><td style="padding: 8px 0;">${safe.service}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: 700; vertical-align: top;">Message</td><td style="padding: 8px 0;">${safe.message}</td></tr>
          </tbody>
        </table>
      </div>
    `,
  };
}

export async function sendBookingEmail(values: BookingFormValues) {
  const config = getBookingEmailConfig();

  if (!config.apiKey || !config.fromEmail || !config.bookingEmail) {
    throw new Error("Booking email is not configured.");
  }

  const resend = new Resend(config.apiKey);
  const email = buildBookingEmail(values);

  const { error } = await resend.emails.send({
    from: config.fromEmail,
    to: config.bookingEmail,
    replyTo: values.email,
    subject: email.subject,
    text: email.text,
    html: email.html,
  });

  if (error) {
    throw new Error(error.message || "Failed to send booking email.");
  }
}
