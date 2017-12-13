export function isMobileDevice() {
  return getWindow() && 'ontouchstart' in getWindow();
}

export function attachPointerDownEvent(eventHandler) {
  // SSR
  if (!getWindow()) {
    return {};
  }

  if (isMobileDevice()) {
    return { onTouchStart: eventHandler };
  }

  return { onMouseDown: eventHandler };
}

export function attachPointerUpEvent(eventHandler) {
  // SSR
  if (!getWindow()) {
    return {};
  }

  if (isMobileDevice()) {
    return { onTouchEnd: eventHandler };
  }

  return { onMouseUp: eventHandler };
}

function getWindow() {
  return global.window;
}
