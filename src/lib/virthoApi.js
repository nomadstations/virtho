import keycloak from '@/lib/keycloak';
import { getActiveEntityId } from '@/lib/activeEntityStore';

function requireEnv(name) {
  const value = import.meta.env[name];

  if (!value) {
    throw new Error(`[Virtho API] Missing required environment variable: ${name}`);
  }

  return value;
}

const API_BASE_URL = requireEnv('VITE_API_URL').replace(/\/+$/, '');
const API_PREFIX = '/api/v1';

function buildUrl(path) {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${API_BASE_URL}${API_PREFIX}${cleanPath}`;
}

async function ensureFreshToken() {
  if (!keycloak.authenticated || !keycloak.token) {
    await keycloak.login({ redirectUri: window.location.href });
    throw new Error('[Virtho API] User is not authenticated');
  }

  try {
    await keycloak.updateToken(30);
  } catch (err) {
    await keycloak.login({ redirectUri: window.location.href });
    throw err;
  }

  return keycloak.token;
}

function parseResponseBody(text) {
  if (!text) return null;

  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

export class VirthoApiError extends Error {
  constructor(message, status, data) {
    super(message);
    this.name = 'VirthoApiError';
    this.status = status;
    this.data = data;
  }
}

export async function virthoFetch(path, options = {}) {
  const {
    method = 'GET',
    headers,
    body,
    activeEntityId,
    includeActiveEntity = true,
    ...fetchOptions
  } = options;

  const token = await ensureFreshToken();
  const requestHeaders = new Headers(headers ?? {});

  requestHeaders.set('Authorization', `Bearer ${token}`);

  if (!requestHeaders.has('Accept')) {
    requestHeaders.set('Accept', 'application/json');
  }

  const effectiveActiveEntityId =
    activeEntityId ?? (includeActiveEntity ? getActiveEntityId() : null);

  if (effectiveActiveEntityId) {
    requestHeaders.set('X-Active-Entity-Id', effectiveActiveEntityId);
  }

  let requestBody = body;

  if (
    body !== undefined &&
    body !== null &&
    typeof body === 'object' &&
    !(body instanceof FormData) &&
    !(body instanceof Blob)
  ) {
    requestHeaders.set('Content-Type', 'application/json');
    requestBody = JSON.stringify(body);
  }

  const response = await fetch(buildUrl(path), {
    method,
    headers: requestHeaders,
    body: requestBody,
    ...fetchOptions,
  });

  const responseText = await response.text();
  const responseData = parseResponseBody(responseText);

  if (response.status === 401) {
    await keycloak.login({ redirectUri: window.location.href });
    throw new VirthoApiError('Unauthorized', response.status, responseData);
  }

  if (!response.ok) {
    const message =
      responseData?.message ||
      responseData?.error ||
      `Request failed with status ${response.status}`;

    throw new VirthoApiError(message, response.status, responseData);
  }

  return responseData;
}

export const virthoApi = {
  syncMe: () =>
    virthoFetch('/me/sync', {
      method: 'POST',
      includeActiveEntity: false,
    }),

  getMyEntities: () =>
    virthoFetch('/me/entities', {
      includeActiveEntity: false,
    }),

  selectContext: (entityId) =>
    virthoFetch('/context/select', {
      method: 'POST',
      body: { entity_id: entityId },
      includeActiveEntity: false,
    }),

  createOrganization: (payload) =>
    virthoFetch('/entities/organization', {
      method: 'POST',
      body: payload,
      includeActiveEntity: false,
    }),
};