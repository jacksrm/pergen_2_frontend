import React from 'react';

import './style.css';

export const UNCHECKED = -1;
export const CHECKED = 1;
export const INDETERMINATE = 0;

export default function Check(props) {
  const { index, label, ...otherProps } = props;
  // const checkRef = useRef();

  // useState(() => {
  //   console.log(checkRef)
  //   if(checkRef.current) {
  //     checkRef.current.indeterminate = status === INDETERMINATE 
  //   }

  //   // checkRef.current.checked = status === CHECKED
  // }, []);

  return (
    <>
      <input
        className="check"
        type="checkbox"
        id={`permutation-check${index}`}
        {...otherProps}
      />
      <label htmlFor={`permutation-check${index}`}> {label}</label>
    </>
  );
}
