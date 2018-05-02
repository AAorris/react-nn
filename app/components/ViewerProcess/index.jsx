import React from 'react';

import { convertToJSON } from 'react-json-renderer';
import {Barchart} from './jsonviz';

const Node = 'node';
const Bla = (props) => <Node>{props.text}</Node>;

class Viewer extends React.Component {
  render() {
    return (
      <div className='flex space-around'>
        bla
      </div>
    )
  }
}

export default Viewer;

/*
this.props.children.filter(
  node => node.selected
).map(
  node => <div>
    {(() => {
      const result = [];
      for (var i = 0; i < node.n; i++) {
        result.push(<p style={ {lineHeight: '1em'} }>O</p>);
      }
      return result;
    })()}
  </div>
)
*/
