// @flow

import { createTimeoutBumper } from './timeout-bumper';

jest.useFakeTimers();

const TIMEOUT1 = 1000;
const TIMEOUT2 = 2000;
const TIMEOUT3 = 3000;

const handler1 = jest.fn();
const handler2 = jest.fn();
const handler3 = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
});

test('handlers are called sequentially', () => {
  const { bumpTimeout } = createTimeoutBumper(
    {
      handler: handler1,
      timeout: TIMEOUT1
    },
    {
      handler: handler2,
      timeout: TIMEOUT2
    },
    {
      handler: handler3,
      timeout: TIMEOUT3
    }
  );

  bumpTimeout('1337');

  expect(handler1).not.toHaveBeenCalled();
  expect(handler2).not.toHaveBeenCalled();
  expect(handler3).not.toHaveBeenCalled();

  jest.runTimersToTime(TIMEOUT1);

  expect(handler1).toHaveBeenCalledWith('1337');
  expect(handler1).toHaveBeenCalledTimes(1);
  expect(handler2).not.toHaveBeenCalled();
  expect(handler3).not.toHaveBeenCalled();

  jest.runTimersToTime(TIMEOUT2);

  expect(handler1).toHaveBeenCalledTimes(1);
  expect(handler2).toHaveBeenCalledWith('1337');
  expect(handler2).toHaveBeenCalledTimes(1);
  expect(handler3).not.toHaveBeenCalled();

  jest.runTimersToTime(TIMEOUT3);

  expect(handler1).toHaveBeenCalledTimes(1);
  expect(handler2).toHaveBeenCalledTimes(1);
  expect(handler3).toHaveBeenCalledWith('1337');
  expect(handler3).toHaveBeenCalledTimes(1);

  // From this point we want to make sure the handlers aren't called again
  jest.runTimersToTime(100000);

  expect(handler1).toHaveBeenCalledTimes(1);
  expect(handler2).toHaveBeenCalledTimes(1);
  expect(handler3).toHaveBeenCalledTimes(1);
});

test('handlers are not called while bumping', () => {
  const { bumpTimeout } = createTimeoutBumper(
    {
      handler: handler1,
      timeout: TIMEOUT1
    },
    {
      handler: handler2,
      timeout: TIMEOUT2
    },
    {
      handler: handler3,
      timeout: TIMEOUT3
    }
  );

  bumpTimeout('1337');

  expect(handler1).not.toHaveBeenCalled();
  expect(handler2).not.toHaveBeenCalled();
  expect(handler3).not.toHaveBeenCalled();

  jest.runTimersToTime(TIMEOUT1 - 1);
  bumpTimeout('1337');
  jest.runTimersToTime(TIMEOUT1 - 1);

  expect(handler1).not.toHaveBeenCalled();
  expect(handler2).not.toHaveBeenCalled();
  expect(handler3).not.toHaveBeenCalled();

  jest.runTimersToTime(1);

  expect(handler1).toHaveBeenCalledWith('1337');
  expect(handler1).toHaveBeenCalledTimes(1);
  expect(handler2).not.toHaveBeenCalled();
  expect(handler3).not.toHaveBeenCalled();

  bumpTimeout('1337');
  jest.runTimersToTime(TIMEOUT1 - 1);

  expect(handler1).toHaveBeenCalledWith('1337');
  expect(handler1).toHaveBeenCalledTimes(1);
  expect(handler2).not.toHaveBeenCalled();
  expect(handler3).not.toHaveBeenCalled();

  jest.runTimersToTime(1);

  expect(handler1).toHaveBeenCalledWith('1337');
  expect(handler1).toHaveBeenCalledTimes(2);
  expect(handler2).not.toHaveBeenCalled();
  expect(handler3).not.toHaveBeenCalled();

  jest.runTimersToTime(TIMEOUT2 + TIMEOUT3);

  expect(handler1).toHaveBeenCalledTimes(2);
  expect(handler2).toHaveBeenCalledTimes(1);
  expect(handler3).toHaveBeenCalledTimes(1);
});

test('handlers are canceled', () => {
  const { bumpTimeout, cancelAllTimeouts } = createTimeoutBumper(
    {
      handler: handler1,
      timeout: TIMEOUT1
    },
    {
      handler: handler2,
      timeout: TIMEOUT2
    },
    {
      handler: handler3,
      timeout: TIMEOUT3
    }
  );

  bumpTimeout('1337');
  bumpTimeout('1338');
  bumpTimeout('1339');
  cancelAllTimeouts();

  jest.runTimersToTime(TIMEOUT1 + TIMEOUT2 + TIMEOUT3);

  expect(handler1).not.toHaveBeenCalled();
  expect(handler2).not.toHaveBeenCalled();
  expect(handler3).not.toHaveBeenCalled();
});
