// @flow

import React from 'react';

import type { Node } from 'react';

export type Props = {
  type?: 'button' | 'submit' | 'reset',
  children: Node,
  bgColor?: string,
  color?: string,
  colorDisabled?: string
};

export default ({
  type = 'button',
  children,
  bgColor = '#34495f',
  color = '#fff',
  colorDisabled = 'rgba(255, 255, 255, 0.6)',
  ...rest
}: Props) => (
  <button type={type} className="button" {...rest}>
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
        font-family: -apple-system, BlinkMacSystemFont, Ubuntu, 'Helvetica Neue',
          sans-serif;
        font-size: 1.1em;
        font-weight: 600;
        text-transform: uppercase;
        outline: none;
        cursor: pointer;
        user-select: none;
        transition: transform 0.2s;
        transform: translate(0, 0);
      }

      .button:focus,
      .button:hover {
        transform: translate(0, -0.25em);
      }

      .button:active {
        transform: translate(0, 0);
      }

      .button:disabled {
        cursor: default;
        color: ${colorDisabled};
        transform: translate(0, 0);
      }
    `}</style>
  </button>
);
