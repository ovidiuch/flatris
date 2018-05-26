// @flow

type TimeoutConfig = {
  handler: (id: string) => mixed,
  timeout: number
};

export function createTimeoutBumper(...configs: Array<TimeoutConfig>) {
  const timeoutStep: { [string]: number } = {};
  const timeouts: { [string]: TimeoutID } = {};

  function schedule(id: string) {
    const step = timeoutStep[id];
    const config = configs[step];
    const { handler, timeout } = config;

    timeouts[id] = setTimeout(() => {
      handler(id);

      if (configs.length > step + 1) {
        timeoutStep[id]++;
        schedule(id);
      } else {
        delete timeoutStep[id];
        delete timeouts[id];
      }
    }, timeout);
  }

  function cancelTimeout(id: string) {
    const prevTimeout = timeouts[id];
    if (prevTimeout) {
      clearTimeout(prevTimeout);

      delete timeoutStep[id];
      delete timeouts[id];
    }
  }

  function cancelAllTimeouts() {
    Object.keys(timeouts).forEach(cancelTimeout);
  }

  function bumpTimeout(id: string) {
    cancelTimeout(id);

    timeoutStep[id] = 0;
    schedule(id);
  }

  return {
    bumpTimeout,
    cancelAllTimeouts
  };
}
