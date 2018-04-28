import React from 'react';

class Viewer extends React.Component {
  render() {
    return (
      <div className='flex space-around'>
        {
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
        }
      </div>
    )
  }
}

export default Viewer;
