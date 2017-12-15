import React from 'react';

export default ({ children, ...rest }) => (
  <button className="button" {...rest}>
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
        background: #34495f;
        color: #fff;
        font-family: Helvetica, Arial, sans-serif;
        font-weight: 300;
        outline: none;
        cursor: pointer;
        user-select: none;
      }
    `}</style>
  </button>
);
