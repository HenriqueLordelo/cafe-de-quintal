/*
 * Server-only access to the project's SQLite database over HTTP.
 * Import from API routes or getServerSideProps, never from the browser.
 */

type QueryPayload<T> = {
  success?: boolean;
  rows?: T[];
  result?: { results?: T[] }[];
  errors?: { message?: string }[];
};

export async function query<T = Record<string, unknown>>(
  sql: string,
  params: unknown[] = [],
): Promise<T[]> {
  if (typeof window !== "undefined")
    throw new Error("The database can only be used on the server");

  const url = process.env.DATABASE_URL;
  const token = process.env.DATABASE_TOKEN;

  if (!url || !token) throw new Error("The database is not configured");

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ sql, params }),
  });

  const payload = (await response
    .json()
    .catch(() => null)) as QueryPayload<T> | null;

  if (!response.ok || !payload || payload.success === false) {
    const message =
      payload?.errors?.[0]?.message ??
      `Database request failed with status ${response.status}`;

    throw new Error(message);
  }

  return payload.rows ?? payload.result?.[0]?.results ?? [];
}
