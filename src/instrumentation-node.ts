/*
 * Node-only half of instrumentation.ts. Kept in its own file so the Edge
 * Runtime build never sees the node:http import.
 */
import { ServerResponse } from "node:http";

type HeaderMethod = (this: unknown, ...args: unknown[]) => unknown;

export const patchSetCookie = () => {
  const proto = ServerResponse.prototype as unknown as Record<
    string,
    HeaderMethod
  >;

  const normalizeCookie = (cookie: string) => {
    let next = cookie.replace(/;\s*SameSite\s*=\s*(Lax|Strict)/gi, "");

    if (!/;\s*SameSite\s*=/i.test(next)) next += "; SameSite=None";
    if (!/;\s*Secure(\s*;|\s*$)/i.test(next)) next += "; Secure";

    return next;
  };

  const normalize = (value: unknown): unknown => {
    if (Array.isArray(value))
      return value.map((item) =>
        typeof item === "string" ? normalizeCookie(item) : item,
      );
    if (typeof value === "string") return normalizeCookie(value);

    return value;
  };

  const isSetCookie = (name: unknown) =>
    typeof name === "string" && name.toLowerCase() === "set-cookie";

  const originalSetHeader = proto.setHeader;

  proto.setHeader = function (name: unknown, value: unknown) {
    if (isSetCookie(name)) value = normalize(value);

    return originalSetHeader.call(this, name, value);
  };

  if (typeof proto.appendHeader === "function") {
    const originalAppendHeader = proto.appendHeader;

    proto.appendHeader = function (name: unknown, value: unknown) {
      if (isSetCookie(name)) value = normalize(value);

      return originalAppendHeader.call(this, name, value);
    };
  }

  if (typeof proto.writeHead === "function") {
    const originalWriteHead = proto.writeHead;

    proto.writeHead = function (...args: unknown[]) {
      const headers = args[args.length - 1];

      if (headers && typeof headers === "object" && !Array.isArray(headers)) {
        const record = headers as Record<string, unknown>;

        for (const key of Object.keys(record)) {
          if (key.toLowerCase() === "set-cookie")
            record[key] = normalize(record[key]);
        }
      }

      return originalWriteHead.apply(this, args);
    };
  }
};
