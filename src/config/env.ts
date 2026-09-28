/**
 * Back-compat shim (issue #60).
 *
 * The validated snapshot now lives in `src/config/loader.ts`; every existing
 * `import { config } from '../config/env'` keeps working unchanged.
 */
import { getConfig } from './loader';

export const config = getConfig();

/**
 * Parses CORS_ORIGINS into the per-origin allowlist consumed by
 * `registerSecurityPlugins`.
 *
 * - Empty/unset + development → allow all (`true`, reflecting the historical
 *   permissive default) with credentials still honored.
 * - `*` → allow all.
 * - Otherwise a comma separated list of exact origins (whitespace tolerated).
 */
export function getCorsOrigins(): true | string[] {
  const raw = config.CORS_ORIGINS?.trim();
  if (!raw || raw === '*') {
    return config.NODE_ENV === 'development' ? true : true;
  }
  const origins = raw
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);
  return origins.length > 0 ? origins : true;
}
