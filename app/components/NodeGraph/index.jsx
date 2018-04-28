import React from 'react';

import Node from './Node';

class NodeGraph extends React.Component {

  constructor(props) {
    super(props);
    this.onToggleNode = this.onToggleNode.bind(this);
    this.renderNodes = this.renderNodes.bind(this);
    this.setNodeProperty = this.setNodeProperty.bind(this);
    this.state = {
      draw: this.renderNodes,
      setNodeProperty: this.setNodeProperty,
      nodes: [
        {name: 'a', selected: false},
        {name: 'b', selected: false},
      ],
    };
  }

  setNodeProperty(node, property, value) {
    const nodes = Object.assign([], this.state.nodes)
    for (var idx = 0; idx < this.state.nodes.length; idx++) {
      const focused = this.state.nodes[idx];
      if (node === focused) {
        node[property] = value;  // NOTE: not treated as immutable
        this.setState({ nodes });  // NOTE: state change is triggered here
        return;
      }
    }
  }

  onToggleNode(node) {
    const nodes = Object.assign([], this.state.nodes);
    for (var idx = 0; idx < nodes.length; idx++) {
      const current = nodes[idx];
      if (current === node) {
        current.selected = !current.selected;
      }
    }
    this.setState({ nodes });
  }

  renderNodes(data) {
    return this.state.nodes.map((node, idx) => (
      <Node
        key={node.name}
        name={node.name}
        selected={node.selected}
        onClick={e => this.onToggleNode(node) }
      />
    ));
  }

  render() {
    return this.props.render(this.state)
  }
}

export default NodeGraph;
