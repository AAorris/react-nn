import React from 'react';

class PropertiesPanel extends React.Component {
  render() {
    if (!this.props.children) {
      return null
    }
    return (
      <div>{
        this.props.children
        .filter(node => node.selected)
        .map((node, idx) => {
          return (
            <div>
              {( () => (idx > 0) ? (<div>--------</div>) : null )()}
              <div>
                <span>Name: </span>
                <input
                  value={node.name}
                  onChange={e => this.props.setNodeProperty(node, 'name', e.target.value)}
                />
                <input
                  type='range'
                  min='1'
                  max='10'
                  value={node.n}
                  onChange={e => this.props.setNodeProperty(node, 'n', parseInt(e.target.value))}
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
