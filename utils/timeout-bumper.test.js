// @flow

import { createTimeoutBumper } from './timeout-bumper';

jest.useFakeTimers();

const TIMEOUT1 = 1000;
const TIMEOUT2 = 2000;
const TIMEOUT3 = 3000;

const handler1 = jest.fn();
const handler2 = jest.fn();
const handler3 = jest.fn();

const createHandler1 = jest.fn(() => handler1);
const createHandler2 = jest.fn(() => handler2);
const createHandler3 = jest.fn(() => handler3);

beforeEach(() => {
  jest.clearAllMocks();
});

test('handlers are called sequentially', () => {
  const { bumpTimeout } = createTimeoutBumper(
    {
      handlerCreator: createHandler1,
      timeout: TIMEOUT1
    },
    {
      handlerCreator: createHandler2,
      timeout: TIMEOUT2
    },
    {
      handlerCreator: createHandler3,
      timeout: TIMEOUT3
    }
  );

  bumpTimeout('1337');

  expect(createHandler1).not.toHaveBeenCalled();
  expect(createHandler2).not.toHaveBeenCalled();
  expect(createHandler3).not.toHaveBeenCalled();

  jest.runTimersToTime(TIMEOUT1);

  expect(createHandler1).toHaveBeenCalledWith('1337');
  expect(handler1).toHaveBeenCalledTimes(1);
  expect(createHandler2).not.toHaveBeenCalled();
  expect(createHandler3).not.toHaveBeenCalled();

  jest.runTimersToTime(TIMEOUT2);

  expect(createHandler1).toHaveBeenCalledTimes(1);
  expect(handler1).toHaveBeenCalledTimes(1);
  expect(createHandler2).toHaveBeenCalledWith('1337');
  expect(handler2).toHaveBeenCalledTimes(1);
  expect(createHandler3).not.toHaveBeenCalled();

  jest.runTimersToTime(TIMEOUT3);

  expect(createHandler1).toHaveBeenCalledTimes(1);
  expect(handler1).toHaveBeenCalledTimes(1);
  expect(createHandler2).toHaveBeenCalledTimes(1);
  expect(handler2).toHaveBeenCalledTimes(1);
  expect(createHandler3).toHaveBeenCalledWith('1337');
  expect(handler3).toHaveBeenCalledTimes(1);

  // From this point we want to make sure the handlers aren't called again
  jest.runTimersToTime(100000);

  expect(createHandler1).toHaveBeenCalledTimes(1);
  expect(handler1).toHaveBeenCalledTimes(1);
  expect(createHandler2).toHaveBeenCalledTimes(1);
  expect(handler2).toHaveBeenCalledTimes(1);
  expect(createHandler3).toHaveBeenCalledTimes(1);
  expect(handler3).toHaveBeenCalledTimes(1);
});

test('handlers are not called while bumping', () => {
  const { bumpTimeout } = createTimeoutBumper(
    {
      handlerCreator: createHandler1,
      timeout: TIMEOUT1
    },
    {
      handlerCreator: createHandler2,
      timeout: TIMEOUT2
    },
    {
      handlerCreator: createHandler3,
      timeout: TIMEOUT3
    }
  );

  bumpTimeout('1337');

  expect(createHandler1).not.toHaveBeenCalled();
  expect(createHandler2).not.toHaveBeenCalled();
  expect(createHandler3).not.toHaveBeenCalled();

  jest.runTimersToTime(TIMEOUT1 - 1);
  bumpTimeout('1337');
  jest.runTimersToTime(TIMEOUT1 - 1);

  expect(createHandler1).not.toHaveBeenCalled();
  expect(createHandler2).not.toHaveBeenCalled();
  expect(createHandler3).not.toHaveBeenCalled();

  jest.runTimersToTime(1);

  expect(createHandler1).toHaveBeenCalledWith('1337');
  expect(handler1).toHaveBeenCalledTimes(1);
  expect(createHandler2).not.toHaveBeenCalled();
  expect(createHandler3).not.toHaveBeenCalled();

  bumpTimeout('1337');
  jest.runTimersToTime(TIMEOUT1 - 1);

  expect(createHandler1).toHaveBeenCalledWith('1337');
  expect(handler1).toHaveBeenCalledTimes(1);
  expect(createHandler2).not.toHaveBeenCalled();
  expect(createHandler3).not.toHaveBeenCalled();

  jest.runTimersToTime(1);

  expect(createHandler1).toHaveBeenCalledWith('1337');
  expect(handler1).toHaveBeenCalledTimes(2);
  expect(createHandler2).not.toHaveBeenCalled();
  expect(createHandler3).not.toHaveBeenCalled();

  jest.runTimersToTime(TIMEOUT2 + TIMEOUT3);

  expect(createHandler1).toHaveBeenCalledTimes(2);
  expect(handler1).toHaveBeenCalledTimes(2);
  expect(createHandler2).toHaveBeenCalledTimes(1);
  expect(handler2).toHaveBeenCalledTimes(1);
  expect(createHandler3).toHaveBeenCalledTimes(1);
  expect(handler3).toHaveBeenCalledTimes(1);
});

test('handlers are canceled', () => {
  const { bumpTimeout, cancelTimeout } = createTimeoutBumper(
    {
      handlerCreator: createHandler1,
      timeout: TIMEOUT1
    },
    {
      handlerCreator: createHandler2,
      timeout: TIMEOUT2
    },
    {
      handlerCreator: createHandler3,
      timeout: TIMEOUT3
    }
  );

  bumpTimeout('1337');
  cancelTimeout('1337');

  jest.runTimersToTime(TIMEOUT1 + TIMEOUT2 + TIMEOUT3);

  expect(createHandler1).not.toHaveBeenCalled();
  expect(handler1).not.toHaveBeenCalled();
  expect(createHandler2).not.toHaveBeenCalled();
  expect(handler2).not.toHaveBeenCalled();
  expect(createHandler3).not.toHaveBeenCalled();
  expect(handler3).not.toHaveBeenCalled();
});
