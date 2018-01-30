// @flow

import React from 'react';
import Button from './Button';
import { attachPointerDownEvent, attachPointerUpEvent } from '../utils/events';

import type { Node } from 'react';

type Props = {
  children: Node,
  onPress?: Function,
  onRelease?: Function
};

export default ({ children, onPress, onRelease }: Props) => {
  let props = {};
  if (onPress) {
    props = { ...props, ...attachPointerDownEvent(onPress) };
  }
  if (onRelease) {
    props = { ...props, ...attachPointerUpEvent(onRelease) };
  }

  return <Button {...props}>{children}</Button>;
};
