import type { FC, FormEvent, ReactNode } from "react";

import { useRef, useState } from "react";
import { Check, LoaderCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "success" | "error";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const FALLBACK_ERROR =
  "We could not save your email just now. Please try again in a moment.";

const JoinForm: FC = (): ReactNode => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const honeypotRef = useRef<HTMLInputElement>(null);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (status === "submitting") return;

    const value = email.trim();

    if (!EMAIL_PATTERN.test(value)) {
      setStatus("error");
      setError("Please enter a valid email address.");
      return;
    }

    setStatus("submitting");
    setError("");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: value,
          company: honeypotRef.current?.value ?? "",
        }),
      });

      const data = (await response.json().catch(() => null)) as {
        message?: string;
      } | null;

      if (!response.ok) throw new Error(data?.message || FALLBACK_ERROR);

      setStatus("success");
    } catch (submitError) {
      setStatus("error");
      setError(
        submitError instanceof Error && submitError.message
          ? submitError.message
          : FALLBACK_ERROR,
      );
    }
  };

  if (status === "success") {
    return (
      <div
        role="status"
        className="mt-8 flex max-w-lg items-start gap-3 rounded-2xl bg-espresso px-5 py-4 text-cream animate-in fade-in slide-in-from-bottom-2 duration-500"
      >
        <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-crema text-espresso">
          <Check aria-hidden className="size-4" strokeWidth={2.5} />
        </span>

        <div>
          <p className="font-semibold">You&apos;re on the list.</p>

          <p className="mt-1 text-sm text-cream/65">
            We&apos;ll write the day the next flavor reaches the menu.
          </p>
        </div>
      </div>
    );
  }

  const hasError = status === "error" && error !== "";

  return (
    <form noValidate onSubmit={onSubmit} className="relative mt-8 max-w-lg">
      <div className="flex flex-col gap-3 sm:flex-row">
        <label htmlFor="join-email" className="sr-only">
          Email address
        </label>

        <input
          id="join-email"
          type="email"
          name="email"
          autoComplete="email"
          inputMode="email"
          required
          placeholder="you@example.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          aria-invalid={hasError}
          aria-describedby="join-hint"
          className={cn(
            "h-13 min-w-0 flex-1 rounded-full border bg-cream px-5 text-base text-espresso outline-none transition-[border-color,box-shadow] placeholder:text-espresso/45 focus-visible:border-espresso focus-visible:ring-2 focus-visible:ring-espresso/25",
            hasError ? "border-red-900/60" : "border-espresso/15",
          )}
        />

        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex h-13 shrink-0 cursor-pointer items-center justify-center gap-2 rounded-full bg-espresso px-6 text-sm font-semibold text-cream transition-colors hover:bg-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-espresso disabled:cursor-wait disabled:opacity-80"
        >
          {status === "submitting" && (
            <LoaderCircle aria-hidden className="size-4 animate-spin" />
          )}
          {status === "submitting" ? "Joining" : "Join the list"}
        </button>
      </div>

      <div
        aria-hidden
        className="absolute -left-[9999px] top-0 size-px overflow-hidden"
      >
        <label htmlFor="join-company">Company</label>
        <input
          ref={honeypotRef}
          id="join-company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <p
        id="join-hint"
        role={hasError ? "alert" : undefined}
        className={cn(
          "mt-3 px-1 text-sm",
          hasError ? "font-medium text-red-950" : "text-espresso/65",
        )}
      >
        {hasError ? error : "We only write when there's a new flavor."}
      </p>
    </form>
  );
};

export default JoinForm;
