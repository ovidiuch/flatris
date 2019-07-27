// @flow

import classNames from 'classnames';
import React from 'react';

import type { Node } from 'react';

type Props = {
  type?: 'button' | 'submit' | 'reset',
  children: Node,
  bgColor?: string,
  color?: string,
  colorDisabled?: string,
  hoverEffect?: boolean
};

export default function Button({
  type = 'button',
  children,
  bgColor = '#34495f',
  color = '#fff',
  colorDisabled = 'rgba(255, 255, 255, 0.6)',
  hoverEffect = true,
  ...rest
}: Props) {
  const classes = classNames('button', {
    'hover-button': hoverEffect
  });

  return (
    <button type={type} className={classes} {...rest}>
      {children}
      <style jsx>{`
        .button {
          position: absolute;
          width: 100%;
          height: 100%;
          display: block;
          margin: 0;
          padding: 0;
          border: 0;
          background: ${bgColor};
          color: ${color};
          font-family: -apple-system, BlinkMacSystemFont, Ubuntu,
            'Helvetica Neue', sans-serif;
          font-size: 1.1em;
          font-weight: 600;
          text-transform: uppercase;
          outline: none;
          cursor: pointer;
          user-select: none;
          touch-action: manipulation;
        }

        .button:disabled {
          cursor: default;
          color: ${colorDisabled};
        }

        .hover-button {
          transform: translate3d(0, 0, 0);
          transition: transform 0.2s;
        }

        .hover-button:focus,
        .hover-button:hover {
          transform: translate3d(0, -0.25em, 0);
        }

        .hover-button:active,
        .hover-button:disabled {
          transform: translate3d(0, 0, 0);
        }
      `}</style>
    </button>
  );
}
