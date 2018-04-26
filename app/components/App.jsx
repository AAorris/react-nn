import React from 'react';

import NodeGraph from './NodeGraph';
import PropertiesPanel from './PropertiesPanel';
import ViewerProcess from './ViewerProcess';

import style from './style.css';

const App = props => {
  return (
    <NodeGraph render={(graph) =>
      <div className={style.app}>
        <div className={`${style.viewer} ${style.flex}`}>
          <ViewerProcess>
            <div>
              {
                graph.nodes.filter(
                  node => node.selected
                ).map(
                  node => node.name
                ).join(' => ')
              }
            </div>
          </ViewerProcess>
        </div>
        <div className={style.graphContainer}>
          <div className={`${style.graph} ${style.flex}`}>
            {graph.draw()}
          </div>
          <div className={`${style.properties} ${style.flex}`}>
            <PropertiesPanel>
              <div>Nodes</div>
              <div><pre>{JSON.stringify(graph.nodes, null, 2)}</pre></div>
            </PropertiesPanel>
          </div>
        </div>
      </div>
    }/>
  );
}

export default App;
