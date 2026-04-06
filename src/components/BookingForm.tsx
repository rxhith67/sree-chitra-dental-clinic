"use client";

import { useMemo, useState } from "react";
import { clinicData } from "@/lib/clinicData";
import {
  hasBookingErrors,
  initialBookingValues,
  normalizeBookingPayload,
  validateBookingPayload,
  type BookingField,
  type BookingFormErrors,
  type BookingFormValues,
} from "@/lib/booking";

type BookingFormProps = {
  className?: string;
};

type SubmitState = "idle" | "submitting" | "success" | "error";

export default function BookingForm({ className = "" }: BookingFormProps) {
  const [values, setValues] = useState<BookingFormValues>(initialBookingValues);
  const [errors, setErrors] = useState<BookingFormErrors>({});
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const serviceOptions = useMemo(
    () => clinicData.services.map((service) => service.title),
    [],
  );

  function handleChange(field: BookingField, value: string) {
    setValues((current) => ({
      ...current,
      [field]: value,
    }));

    setErrors((current) => {
      if (!current[field]) {
        return current;
      }

      const nextErrors = { ...current };
      delete nextErrors[field];
      return nextErrors;
    });

    if (submitState !== "idle") {
      setSubmitState("idle");
      setFeedbackMessage("");
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const normalized = normalizeBookingPayload(values);
    const nextErrors = validateBookingPayload(normalized);

    setErrors(nextErrors);

    if (hasBookingErrors(nextErrors)) {
      setSubmitState("error");
      setFeedbackMessage("Please review the highlighted fields and try again.");
      return;
    }

    setSubmitState("submitting");
    setFeedbackMessage("");

    try {
      const response = await fetch("/api/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(normalized),
      });

      const result = (await response.json()) as {
        ok: boolean;
        message: string;
        fieldErrors?: BookingFormErrors;
      };

      if (!response.ok || !result.ok) {
        setErrors(result.fieldErrors ?? {});
        setSubmitState("error");
        setFeedbackMessage(
          result.message || "We could not submit your request right now.",
        );
        return;
      }

      setValues(initialBookingValues);
      setErrors({});
      setSubmitState("success");
      setFeedbackMessage(result.message);
    } catch {
      setSubmitState("error");
      setFeedbackMessage(
        "Something went wrong while sending your request. Please try again.",
      );
    }
  }

  function getInputClassName(field: BookingField) {
    const hasError = Boolean(errors[field]);

    return [
      "w-full rounded-2xl border px-4 py-3.5 outline-none transition",
      hasError
        ? "border-rose-300 bg-rose-50 focus:border-rose-400"
        : "border-slate-200 bg-slate-50 focus:border-sky-300 focus:bg-white",
    ].join(" ");
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className={[
        "rounded-[28px] border border-slate-200 bg-white p-7 shadow-[0_18px_45px_rgba(15,23,42,0.05)]",
        className,
      ].join(" ")}
    >
      <div className="grid gap-4">
        <div>
          <label htmlFor="website" className="sr-only">
            Website
          </label>
          <input
            id="website"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={values.website}
            onChange={(event) => handleChange("website", event.target.value)}
            className="hidden"
          />
        </div>

        <div>
          <label
            htmlFor="fullName"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Full Name
          </label>
          <input
            id="fullName"
            name="fullName"
            value={values.fullName}
            onChange={(event) => handleChange("fullName", event.target.value)}
            placeholder="Enter your full name"
            autoComplete="name"
            className={getInputClassName("fullName")}
          />
          {errors.fullName ? (
            <p className="mt-2 text-sm text-rose-600">{errors.fullName}</p>
          ) : null}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="phone"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Phone Number
            </label>
            <input
              id="phone"
              name="phone"
              value={values.phone}
              onChange={(event) => handleChange("phone", event.target.value)}
              placeholder="Enter your phone number"
              autoComplete="tel"
              className={getInputClassName("phone")}
            />
            {errors.phone ? (
              <p className="mt-2 text-sm text-rose-600">{errors.phone}</p>
            ) : null}
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={values.email}
              onChange={(event) => handleChange("email", event.target.value)}
              placeholder="Enter your email address"
              autoComplete="email"
              className={getInputClassName("email")}
            />
            {errors.email ? (
              <p className="mt-2 text-sm text-rose-600">{errors.email}</p>
            ) : null}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="appointmentDate"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Preferred Date
            </label>
            <input
              id="appointmentDate"
              name="appointmentDate"
              type="date"
              value={values.appointmentDate}
              onChange={(event) =>
                handleChange("appointmentDate", event.target.value)
              }
              className={getInputClassName("appointmentDate")}
            />
            {errors.appointmentDate ? (
              <p className="mt-2 text-sm text-rose-600">
                {errors.appointmentDate}
              </p>
            ) : null}
          </div>

          <div>
            <label
              htmlFor="preferredTime"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Preferred Time
            </label>
            <input
              id="preferredTime"
              name="preferredTime"
              value={values.preferredTime}
              onChange={(event) =>
                handleChange("preferredTime", event.target.value)
              }
              placeholder="For example: 10:30 AM"
              className={getInputClassName("preferredTime")}
            />
            {errors.preferredTime ? (
              <p className="mt-2 text-sm text-rose-600">
                {errors.preferredTime}
              </p>
            ) : null}
          </div>
        </div>

        <div>
          <label
            htmlFor="service"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Service Needed
          </label>
          <select
            id="service"
            name="service"
            value={values.service}
            onChange={(event) => handleChange("service", event.target.value)}
            className={getInputClassName("service")}
          >
            <option value="">Select a service</option>
            {serviceOptions.map((service) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>
          {errors.service ? (
            <p className="mt-2 text-sm text-rose-600">{errors.service}</p>
          ) : null}
        </div>

        <div>
          <label
            htmlFor="message"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={values.message}
            onChange={(event) => handleChange("message", event.target.value)}
            placeholder="Tell us briefly about your concern or appointment request"
            rows={4}
            className={getInputClassName("message")}
          />
          {errors.message ? (
            <p className="mt-2 text-sm text-rose-600">{errors.message}</p>
          ) : null}
        </div>

        {feedbackMessage ? (
          <div
            className={[
              "rounded-2xl px-4 py-3 text-sm",
              submitState === "success"
                ? "bg-emerald-50 text-emerald-700"
                : "bg-rose-50 text-rose-700",
            ].join(" ")}
          >
            {feedbackMessage}
          </div>
        ) : null}

        <button
          type="submit"
          disabled={submitState === "submitting"}
          className="rounded-2xl bg-sky-700 px-5 py-3.5 font-semibold text-white shadow-[0_12px_30px_rgba(14,116,206,0.2)] transition hover:bg-sky-800 disabled:cursor-not-allowed disabled:bg-sky-400"
        >
          {submitState === "submitting"
            ? "Submitting Request..."
            : "Submit Request"}
        </button>

        <p className="text-sm leading-6 text-slate-500">
          Our team will review your enquiry and get back to you shortly.
        </p>
      </div>
    </form>
  );
}
