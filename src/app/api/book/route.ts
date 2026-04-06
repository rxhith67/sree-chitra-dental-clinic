import { NextResponse } from "next/server";
import {
  hasBookingErrors,
  isSpamBooking,
  normalizeBookingPayload,
  validateBookingPayload,
  type BookingFormValues,
} from "@/lib/booking";
import { getBookingEmailConfig, sendBookingEmail } from "@/lib/booking-email";
import { clinicData } from "@/lib/clinicData";

type BookingApiSuccess = {
  ok: true;
  message: string;
  bookingEmail: string;
};

type BookingApiError = {
  ok: false;
  message: string;
  fieldErrors?: Record<string, string>;
};

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;

const requestLog = new Map<string, number[]>();

function getClientIdentifier(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");

  return (
    forwardedFor?.split(",")[0]?.trim() ||
    realIp?.trim() ||
    "unknown-client"
  );
}

function isRateLimited(identifier: string) {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW_MS;
  const recentRequests = (requestLog.get(identifier) || []).filter(
    (timestamp) => timestamp > windowStart,
  );

  if (recentRequests.length >= RATE_LIMIT_MAX_REQUESTS) {
    requestLog.set(identifier, recentRequests);
    return true;
  }

  recentRequests.push(now);
  requestLog.set(identifier, recentRequests);
  return false;
}

export async function POST(request: Request) {
  let payload: BookingFormValues;

  try {
    payload = (await request.json()) as BookingFormValues;
  } catch {
    return NextResponse.json<BookingApiError>(
      {
        ok: false,
        message: "Invalid request body.",
      },
      { status: 400 },
    );
  }

  const normalized = normalizeBookingPayload(payload);

  if (isSpamBooking(normalized)) {
    return NextResponse.json<BookingApiSuccess>({
      ok: true,
      message:
        "Your appointment request has been received. Our clinic will contact you shortly.",
      bookingEmail:
        process.env.BOOKING_EMAIL?.trim() || clinicData.bookingEmail,
    });
  }

  const clientIdentifier = getClientIdentifier(request);

  if (isRateLimited(clientIdentifier)) {
    return NextResponse.json<BookingApiError>(
      {
        ok: false,
        message:
          "Too many requests from this device. Please wait a few minutes and try again.",
      },
      { status: 429 },
    );
  }

  const fieldErrors = validateBookingPayload(normalized);

  if (hasBookingErrors(fieldErrors)) {
    return NextResponse.json<BookingApiError>(
      {
        ok: false,
        message: "Please correct the highlighted fields and try again.",
        fieldErrors,
      },
      { status: 400 },
    );
  }

  const bookingConfig = getBookingEmailConfig();

  if (!bookingConfig.isConfigured) {
    return NextResponse.json<BookingApiError>(
      {
        ok: false,
        message:
          "Booking email is not configured yet. Add RESEND_API_KEY, BOOKING_FROM_EMAIL, and BOOKING_EMAIL to enable submissions.",
      },
      { status: 503 },
    );
  }

  try {
    await sendBookingEmail(normalized);
  } catch (error) {
    console.error("Booking email send failed:", error);

    return NextResponse.json<BookingApiError>(
      {
        ok: false,
        message:
          "We could not send your booking request right now. Please try again shortly.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json<BookingApiSuccess>({
    ok: true,
    message:
      "Your appointment request has been received. Our clinic will contact you shortly.",
    bookingEmail: bookingConfig.bookingEmail || clinicData.bookingEmail,
  });
}
