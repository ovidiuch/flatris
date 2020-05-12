// @flow

import React from 'react';
import { getPointerDownEvent, getPointerUpEvent } from '../../utils/events';
import Button from '../Button';

import type { Node } from 'react';

type Props = {
  children: Node,
  disabled?: boolean,
  onPress: Function,
  onRelease?: Function
};

export default function PointerButton({
  children,
  onPress,
  onRelease,
  ...rest
}: Props) {
  const pointerDownEvent = getPointerDownEvent();
  const pointerUpEvent = getPointerUpEvent();
  let props = {
    ...rest
  };

  if (!rest.disabled) {
    if (pointerDownEvent) {
      props = { ...props, [pointerDownEvent]: onPress };
    }
    if (onRelease && pointerUpEvent) {
      props = { ...props, [pointerUpEvent]: onRelease };
    }
  }

  return <Button {...props}>{children}</Button>;
}
