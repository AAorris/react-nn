/* A node in the node graph. */
import React from 'react';

import './style.css';

const Node = props => {
  const classes = ['node'];
  if (props.selected) {
    classes.push('selected');
  }
  return (
    <div className={classes.join(' ')} onClick={props.onClick}>{props.name}</div>
  );
};

export default Node;
