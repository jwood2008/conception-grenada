"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";

type State = "idle" | "submitting" | "success" | "error";

export function WaitlistForm({ assetSlug }: { assetSlug: string }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<State>("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const trimmed = email.trim();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
    if (!valid) {
      setError("Please enter a valid email address.");
      return;
    }

    setState("submitting");

    try {
      // Stub: replace with Supabase insert into `leads` table.
      // await supabase.from('leads').insert({ email: trimmed, asset_slug: assetSlug })
      await new Promise((r) => setTimeout(r, 700));
      void assetSlug;
      setState("success");
    } catch {
      setState("error");
      setError("Something went wrong. Please try again or email us directly.");
    }
  }

  if (state === "success") {
    return (
      <div
        className="flex items-center gap-3 rounded-full border border-sand/40 bg-sand/15 px-5 py-3 text-sm text-foreground"
        role="status"
        aria-live="polite"
      >
        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-sand text-sand-foreground">
          <Check className="h-3.5 w-3.5" />
        </span>
        <span>
          You&apos;re on the list. We&apos;ll be in touch when reservations open.
        </span>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="w-full">
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <label htmlFor="waitlist-email" className="sr-only">
            Email address
          </label>
          <input
            id="waitlist-email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            placeholder="you@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={state === "submitting"}
            className={cn(
              "h-14 w-full rounded-full border bg-background px-6 text-base text-foreground placeholder:text-muted-foreground/70 transition",
              "focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/50",
              error ? "border-destructive" : "border-border"
            )}
          />
        </div>
        <button
          type="submit"
          disabled={state === "submitting"}
          className={cn(
            "group inline-flex h-14 items-center justify-center gap-2 rounded-full bg-primary px-7 text-base font-semibold text-primary-foreground transition",
            "hover:bg-primary/90 disabled:opacity-70"
          )}
        >
          {state === "submitting" ? "Adding…" : "Notify me"}
          <ArrowRight
            className={cn(
              "h-4 w-4 transition-transform",
              state !== "submitting" && "group-hover:translate-x-0.5"
            )}
          />
        </button>
      </div>
      {error && (
        <p className="mt-2 px-2 text-sm text-destructive" role="alert">
          {error}
        </p>
      )}
      <p className="mt-3 px-2 text-xs text-muted-foreground">
        We&apos;ll only email you when reservations open. No spam, no sharing.
      </p>
    </form>
  );
}
