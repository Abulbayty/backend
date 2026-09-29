/**
 * Backwards-compatible configuration entry point.
 *
 * The canonical schema and layered loader live in `schema.ts` and `loader.ts`.
 * Older modules import from `config/env`, so this module intentionally re-exports
 * the same validated snapshot and the small compatibility helper used by the
 * security plugin.
 */
import { getConfig } from './loader';

export const config = getConfig();

/** Resolve the configured comma-separated CORS allow-list. */
export function getCorsOrigins(): string[] | true {
  const raw = config.CORS_ORIGINS;
  if (!raw || raw.trim() === '') return true;
  return raw
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);
}
