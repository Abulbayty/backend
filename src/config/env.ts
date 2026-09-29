/**
 * Back-compat shim for modules that historically imported `config` from this
 * module. The validated snapshot and schema live in loader.ts/schema.ts.
 */
import { getConfig } from './loader';

export const config = getConfig();

/**
 * Convert the comma-separated CORS allowlist into the shape Fastify expects.
 * An omitted or wildcard value intentionally permits any origin.
 */
export function getCorsOrigins(): true | string[] {
  const raw = config.CORS_ORIGINS?.trim();
  if (!raw || raw === '*') return true;

  const origins = raw
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

  return origins.length > 0 ? origins : true;
}
