import React from 'react';

class Viewer extends React.Component {
  render() {
    return (
      <div>{this.props.children}</div>
    )
  }
}

export default Viewer;
