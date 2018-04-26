import React from 'react';

class PropertiesPanel extends React.Component {
  render() {
    return (
      <div>{this.props.children}</div>
    )
  }
}

export default PropertiesPanel;
