import React from 'react';

import Node from './Node';

class NodeGraph extends React.Component {

  constructor(props) {
    super(props);
    this.onToggleNode = this.onToggleNode.bind(this);
    this.renderNodes = this.renderNodes.bind(this);
    this.state = {
      draw: this.renderNodes,
      nodes: [
        {name: 'a', selected: false},
        {name: 'b', selected: false},
      ],
    };
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
