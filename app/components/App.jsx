import React from 'react';

import NodeGraph from './NodeGraph';
import PropertiesPanel from './PropertiesPanel';
import ViewerProcess from './ViewerProcess';
import Resizeable from './Resizeable';

import './style.css';

const App = props => {
  return (
    <NodeGraph render={(graph) =>
      <div className={'app'}>
        <div className={`viewer flex`}>
          <ViewerProcess>
            {graph.nodes}
          </ViewerProcess>
        </div>
        <div className={'graph container'}>
          <div className={`graph flex`}>
            {graph.draw()}
            <div><button onClick={graph.add}>+</button></div>
          </div>
          <Resizeable>
            <PropertiesPanel setNodeProperty={graph.setNodeProperty}>
              { graph.nodes }
            </PropertiesPanel>
          </Resizeable>
        </div>
      </div>
    }/>
  );
}

export default App;
