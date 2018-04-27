import React from 'react';

class Viewer extends React.Component {
  render() {
    return (
      <div>
        {
          this.props.children.filter(
            node => node.selected
          ).map(
            node => node.name
          ).join(' => ')
        }
      </div>
    )
  }
}

export default Viewer;
