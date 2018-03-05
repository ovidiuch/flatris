/* global window */
// @flow

export function logError(err: Error) {
  try {
    window.Rollbar.error(err);
  } catch (err2) {
    console.error('Rollbar client failed');
    console.error(err2);
  }
}
