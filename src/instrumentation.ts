export const register = async () => {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { patchSetCookie } = await import("@/instrumentation-node");

    patchSetCookie();
  }
};
