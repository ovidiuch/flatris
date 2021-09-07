/* global window */
// @flow

export function logError(err: Error | string, customData?: {}) {
  try {
    window.Rollbar.error(err, customData);
  } catch (err2) {
    console.error('Rollbar client failed');
    console.error(err2);
  }
}
