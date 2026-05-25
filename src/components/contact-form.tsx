"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";

type State = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [state, setState] = useState<State>("idle");
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    interest: "Grenada offering",
    message: "",
  });

  function update<K extends keyof typeof form>(k: K, v: (typeof form)[K]) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim());
    if (!form.name.trim() || !validEmail || !form.message.trim()) {
      setError("Please fill in your name, a valid email, and a message.");
      return;
    }

    setState("submitting");
    try {
      // Stub: replace with Supabase insert into `contact_messages`.
      await new Promise((r) => setTimeout(r, 700));
      setState("success");
    } catch {
      setState("error");
      setError("Couldn't send the message. Please email us directly.");
    }
  }

  if (state === "success") {
    return (
      <div
        className="flex items-start gap-4 rounded-2xl border border-sand/40 bg-sand/15 p-6 text-foreground"
        role="status"
        aria-live="polite"
      >
        <span className="inline-flex h-10 w-10 flex-none items-center justify-center rounded-full bg-sand text-sand-foreground">
          <Check className="h-5 w-5" />
        </span>
        <div>
          <p className="text-base font-medium">Message received.</p>
          <p className="mt-1 text-sm text-muted-foreground">
            We&apos;ll get back to you within one business day.
          </p>
        </div>
      </div>
    );
  }

  const interests = [
    "Grenada offering",
    "Future projects",
    "Partnership",
    "Press",
    "Other",
  ];

  return (
    <form onSubmit={onSubmit} className="grid gap-5">
      <Field
        label="Name"
        id="name"
        value={form.name}
        onChange={(v) => update("name", v)}
        autoComplete="name"
        required
      />
      <Field
        label="Email"
        id="email"
        type="email"
        value={form.email}
        onChange={(v) => update("email", v)}
        autoComplete="email"
        required
      />

      <div>
        <label htmlFor="interest" className="eyebrow">
          Interest
        </label>
        <div className="mt-3 flex flex-wrap gap-2">
          {interests.map((i) => {
            const active = form.interest === i;
            return (
              <button
                key={i}
                type="button"
                onClick={() => update("interest", i)}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                  active
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-background text-muted-foreground hover:border-primary/30 hover:text-foreground"
                )}
              >
                {i}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <label htmlFor="message" className="eyebrow">
          Message
        </label>
        <textarea
          id="message"
          rows={5}
          required
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          placeholder="What would you like to know?"
          disabled={state === "submitting"}
          className={cn(
            "mt-3 block w-full resize-y rounded-2xl border bg-background px-5 py-4 text-base text-foreground placeholder:text-muted-foreground/70 transition",
            "focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/50",
            error ? "border-destructive" : "border-border"
          )}
        />
      </div>

      {error && (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-muted-foreground">
          We respond to every message within one business day.
        </p>
        <button
          type="submit"
          disabled={state === "submitting"}
          className={cn(
            "group inline-flex h-12 items-center justify-center gap-2 self-start rounded-full bg-primary px-7 text-sm font-semibold text-primary-foreground transition",
            "hover:bg-primary/90 disabled:opacity-70 sm:self-auto"
          )}
        >
          {state === "submitting" ? "Sending…" : "Send message"}
          <ArrowRight
            className={cn(
              "h-4 w-4 transition-transform",
              state !== "submitting" && "group-hover:translate-x-0.5"
            )}
          />
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  id,
  type = "text",
  value,
  onChange,
  required,
  autoComplete,
}: {
  label: string;
  id: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="eyebrow">
        {label}
      </label>
      <input
        id={id}
        type={type}
        required={required}
        autoComplete={autoComplete}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "mt-3 block h-12 w-full rounded-full border border-border bg-background px-5 text-base text-foreground placeholder:text-muted-foreground/70 transition",
          "focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/50"
        )}
      />
    </div>
  );
}
