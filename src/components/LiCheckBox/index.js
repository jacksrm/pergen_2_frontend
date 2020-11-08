import React, { useState } from 'react';

import './style.css'

export default function LiCheckBox(props) {
  const { checkRef, ...otherProps } = props;
  const [checkStyle, setCheckStyle] = useState('');

  function changeStyle() {
    if (checkStyle === '') setCheckStyle('checked');
    if (checkStyle === 'checked') setCheckStyle('indeterminate');
    if (checkStyle === 'indeterminate') setCheckStyle('');
  }

  return (
    <li
      className={checkStyle}
      onClick={changeStyle}
      {...otherProps}
    >
      {props.children}
    </li>
  );
}
