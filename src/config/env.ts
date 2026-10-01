import { getConfig } from './loader';

/** Backwards-compatible runtime config access for legacy modules. */
export const config = getConfig() as any;

/** Resolve CORS origins from the centralized configuration. */
export function getCorsOrigins(): string[] | true {
  const raw = config.CORS_ORIGINS;
  if (!raw) return config.NODE_ENV === 'development' || config.NODE_ENV === 'test' ? true : [];
  const origins = raw.split(',').map((origin) => origin.trim()).filter(Boolean);
  return origins.length > 0 ? origins : true;
}
