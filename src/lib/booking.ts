export const bookingFields = [
  "fullName",
  "phone",
  "email",
  "appointmentDate",
  "preferredTime",
  "service",
  "message",
  "website",
] as const;

export type BookingField = (typeof bookingFields)[number];

export type BookingFormValues = {
  fullName: string;
  phone: string;
  email: string;
  appointmentDate: string;
  preferredTime: string;
  service: string;
  message: string;
  website: string;
};

export type BookingFormErrors = Partial<Record<BookingField, string>>;

export const initialBookingValues: BookingFormValues = {
  fullName: "",
  phone: "",
  email: "",
  appointmentDate: "",
  preferredTime: "",
  service: "",
  message: "",
  website: "",
};

function cleanText(value: string) {
  return value.trim().replace(/\s+/g, " ");
}

export function normalizeBookingPayload(
  values: BookingFormValues,
): BookingFormValues {
  return {
    fullName: cleanText(values.fullName),
    phone: cleanText(values.phone),
    email: cleanText(values.email).toLowerCase(),
    appointmentDate: values.appointmentDate.trim(),
    preferredTime: cleanText(values.preferredTime),
    service: cleanText(values.service),
    message: cleanText(values.message),
    website: values.website.trim(),
  };
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone: string) {
  return /^[+\d][\d\s()-]{7,}$/.test(phone);
}

export function validateBookingPayload(
  values: BookingFormValues,
): BookingFormErrors {
  const normalized = normalizeBookingPayload(values);
  const errors: BookingFormErrors = {};

  if (normalized.fullName.length < 2) {
    errors.fullName = "Please enter your full name.";
  }

  if (!isValidPhone(normalized.phone)) {
    errors.phone = "Please enter a valid phone number.";
  }

  if (!isValidEmail(normalized.email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!normalized.appointmentDate) {
    errors.appointmentDate = "Please choose a preferred date.";
  }

  if (!normalized.preferredTime) {
    errors.preferredTime = "Please enter a preferred time.";
  }

  if (!normalized.service) {
    errors.service = "Please select the service needed.";
  }

  if (normalized.message.length < 10) {
    errors.message = "Please add a short message so we can help properly.";
  }

  return errors;
}

export function hasBookingErrors(errors: BookingFormErrors) {
  return Object.keys(errors).length > 0;
}

export function isSpamBooking(values: BookingFormValues) {
  const normalized = normalizeBookingPayload(values);
  return normalized.website.length > 0;
}

export function buildWhatsAppBookingUrl(
  values: BookingFormValues,
  whatsappNumber: string,
) {
  const normalized = normalizeBookingPayload(values);
  const cleanNumber = whatsappNumber.replace(/\D/g, "");
  const message = [
    "Hello, I would like to enquire about an appointment at Sree Chitra Dental Clinic.",
    "",
    `Name: ${normalized.fullName}`,
    `Phone: ${normalized.phone}`,
    `Email: ${normalized.email}`,
    `Preferred Date: ${normalized.appointmentDate}`,
    `Preferred Time: ${normalized.preferredTime}`,
    `Service Needed: ${normalized.service}`,
    `Message: ${normalized.message}`,
  ].join("\n");

  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
}
