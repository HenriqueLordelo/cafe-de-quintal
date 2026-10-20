import type { NextApiRequest, NextApiResponse } from "next";

import { query } from "@/lib/db";

type SubscribeResponse = {
  ok?: boolean;
  message?: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SubscribeResponse>,
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ message: "Method not allowed." });
  }

  const body = (req.body ?? {}) as { email?: unknown; company?: unknown };

  // Hidden field only bots fill in: pretend it worked and store nothing.
  if (typeof body.company === "string" && body.company.trim() !== "") {
    return res.status(200).json({ ok: true });
  }

  const email =
    typeof body.email === "string" ? body.email.trim().toLowerCase() : "";

  if (!email || email.length > 254 || !EMAIL_PATTERN.test(email)) {
    return res
      .status(400)
      .json({ message: "Please enter a valid email address." });
  }

  try {
    await query(
      "INSERT INTO subscribers (email, source) VALUES (?, ?) ON CONFLICT (email) DO NOTHING",
      [email, "website"],
    );

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error(
      "Subscribe failed:",
      error instanceof Error ? error.message : error,
    );
    return res.status(500).json({
      message:
        "We could not save your email just now. Please try again in a moment.",
    });
  }
}
