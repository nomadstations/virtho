import Keycloak from 'keycloak-js';

// Fail-fast validation: if an env var is missing we want a clear error
// immediately, not a silent undefined inside the Keycloak config.
function requireEnv(name) {
  const value = import.meta.env[name];
  if (!value || typeof value !== 'string' || value.trim() === '') {
    throw new Error(
      `[Keycloak] Missing required environment variable: ${name}. ` +
      `Check .env.local (local dev) or Vercel project settings (production).`
    );
  }
  return value.trim();
}

const keycloak = new Keycloak({
  url: requireEnv('VITE_KEYCLOAK_URL'),
  realm: requireEnv('VITE_KEYCLOAK_REALM'),
  clientId: requireEnv('VITE_KEYCLOAK_CLIENT_ID'),
});

// Dev-only debug helper. In a production build (vite build), import.meta.env.DEV
// is false, so this block is tree-shaken out and window.__keycloak does not leak.
if (import.meta.env.DEV) {
  // eslint-disable-next-line no-underscore-dangle
  window.__keycloak = keycloak;
  // eslint-disable-next-line no-console
  console.info('[Keycloak] dev mode: window.__keycloak is available for debug');
}

export default keycloak;