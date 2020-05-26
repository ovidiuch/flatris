// @flow

export function isMobileDevice() {
  return getWindow() && 'ontouchstart' in getWindow();
}

export function getPointerDownEvent() {
  // SSR
  if (!getWindow()) {
    return null;
  }

  return isMobileDevice() ? 'onTouchStart' : 'onMouseDown';
}

export function getPointerUpEvent() {
  // SSR
  if (!getWindow()) {
    return null;
  }

  return isMobileDevice() ? 'onTouchEnd' : 'onMouseUp';
}

function getWindow() {
  return global.window;
}
