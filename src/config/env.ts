import { getConfig } from './loader';

/** Backwards-compatible runtime config access for legacy modules. */
export const config = getConfig() as any;

/** Resolve CORS origins from the canonical snapshot. */
export function getCorsOrigins(): string[] | true {
  const raw = config.CORS_ORIGINS;
  if (!raw) return true;
  const origins = String(raw).split(',').map((origin) => origin.trim()).filter(Boolean);
  return origins.length > 0 ? origins : true;
}
