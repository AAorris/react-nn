/* A node in the node graph. */
import React from 'react';

import style from './style.css';

const Node = props => {
  const classes = [style.node];
  if (props.selected) {
    classes.push(style.selected);
  }
  return (
    <div className={classes.join(' ')} onClick={props.onClick}>{props.name}</div>
  );
};

export default Node;
