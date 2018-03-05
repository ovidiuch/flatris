// @flow

export function isMobileDevice() {
  return getWindow() && 'ontouchstart' in getWindow();
}

export function getPointerDownEvent(): ?string {
  // SSR
  if (!getWindow()) {
    return null;
  }

  return isMobileDevice() ? 'onTouchStart' : 'onMouseDown';
}

export function getPointerUpEvent(): ?string {
  // SSR
  if (!getWindow()) {
    return null;
  }

  return isMobileDevice() ? 'onTouchEnd' : 'onMouseUp';
}

function getWindow() {
  return global.window;
}
