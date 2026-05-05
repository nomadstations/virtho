let activeEntityId = null;

export function setActiveEntityId(entityId) {
  activeEntityId = entityId ?? null;
}

export function getActiveEntityId() {
  return activeEntityId;
}

export function clearActiveEntityId() {
  activeEntityId = null;
}