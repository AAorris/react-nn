/* resizeable container. */

import React from 'react';

class Resizeable extends React.Component {
  render() {
    return (
      <div className='resizeable resize-left flex'>
        <div className='spacer'></div>
        {this.props.children}
      </div>
    )
  }
}

export default Resizeable;
