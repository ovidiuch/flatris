// @flow

import React from 'react';
import { getPointerDownEvent, getPointerUpEvent } from '../../../utils/events';
import Button from '../../shared/Button';

import type { Node } from 'react';
import type { ButtonProps } from '../../shared/Button';

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
  const props: $Shape<ButtonProps> = { ...rest };

  if (!rest.disabled) {
    if (pointerDownEvent) props[pointerDownEvent] = onPress;
    if (onRelease && pointerUpEvent) props[pointerUpEvent] = onRelease;
  }

  return <Button {...props}>{children}</Button>;
}
