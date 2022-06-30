import React from 'react';

const Cell = ({ classProp }) => {
  return <div className={classProp ? `${classProp}` : ''}></div>;
};

export default Cell;
