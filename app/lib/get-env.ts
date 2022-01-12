import type { AppLoadContext } from "remix";

export default function getEnv(
  key: string,
  context?: AppLoadContext
): string | null {
  return process?.env[key] || context?.[key] || (global as any)?.[key] || null;
}
