// @flow

type TimeoutConfig = {
  handlerCreator: (id: string) => () => mixed,
  timeout: number
};

export function createTimeoutBumper(...configs: Array<TimeoutConfig>) {
  const timeoutStep: { [string]: number } = {};
  const timeouts: { [string]: TimeoutID } = {};

  function schedule(id: string) {
    const step = timeoutStep[id];
    const config = configs[step];
    const { handlerCreator, timeout } = config;

    timeouts[id] = setTimeout(() => {
      handlerCreator(id)();

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
    }
  }

  function bumpTimeout(id: string) {
    cancelTimeout(id);

    timeoutStep[id] = 0;
    schedule(id);
  }

  return {
    bumpTimeout,
    cancelTimeout
  };
}
