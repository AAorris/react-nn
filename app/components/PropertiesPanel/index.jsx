import React from 'react';

class PropertiesPanel extends React.Component {
  render() {
    if (!this.props.children) {
      return null
    }
    return (
      <div>{
        this.props.children.map((node, idx) => {
          return (
            <div>
              {( () => (idx > 0) ? (<div>--------</div>) : null )()}
              <div>
                <span>Name: </span>
                <input
                  value={node.name}
                  onChange={e => this.props.setNodeProperty(node, 'name', e.target.value)}
                />
              </div>
              <div>
                <span>Selected: </span>
                <span>{node.selected ? 'Yes' : 'No'}</span>
              </div>
            </div>
          )
        })
      }</div>
    )
  }
}

export default PropertiesPanel;
