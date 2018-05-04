import React from 'react';

import VegaSpec from './VegaSpec';


class Viewer extends React.Component {
  render() {
    const data = this.props.children
      .filter(node => node.selected)
      .map((node, x) => {
        return {x, y: node.n};
      }
    )
    console.log(data);
    return (
      <div className='flex space-around'>
        <VegaSpec data={data} />
      </div>
    )
  }
}

export default Viewer;
//
// {
//   this.props.children.filter(
//     node => node.selected
//   ).map(
//     node => <div>
//       {(() => {
//         const result = [];
//         for (var i = 0; i < node.n; i++) {
//           result.push(<p style={ {lineHeight: '1em'} }>O</p>);
//         }
//         return result;
//       })()}
//     </div>
//   )
// }
