/* JSON Visualization with vega */
import React from 'react';
import { Renderer, convertToJSON, convertToObject } from 'react-json-renderer';


const consumeChildren = (props, options) => {
  /* Return props with children converted to named attributes. */
  const { keep } = options;
  const children = props.children;
  const outProps = Object.assign({}, props)
  delete outProps.children;
  const outChildren = children.filter(child => keep.includes(child.type));
  outProps.children = children.filter(
    child => !outChildren.includes(child)
  ).map(child => {
    outProps[child.type] = convertToObject(child.props);
  });
  return outProps;
}


const Graph = 'Graph';
const Size = 'Size';
const Signals = 'Signals';
const Signal = 'Signal';
const On = 'On';
const Scales = 'Scales';
const Scale = 'Scale';
const Axes = 'Axes';
const Axis = 'Axis';
const Data = 'Data';
const Bar = 'Bar';
const Marks = 'Marks';
const Mark = 'Mark';

const CONTAINER_TYPES = [
  'Graph',
]

export const Barchart = convertToObject(
  <Graph schema="https://vega.github.io/schema/vega/v3.json">
    <Size width={400} height={200} padding={5} />
    {/* <Signals>
      <Signal name='tooltip' value={{}}>
        <On events='rect:mouseover' update='datum' />
        <On events='rect:mouseout' update='{}' />
      </Signal>
    </Signals> */}
    <Scales>
      <Scale
        name='xscale'
        type='band'
        domain={ {data: 'table', field: 'category'} }
        range='width'
        padding={0.05}
        round
      />
      <Scale
        name='yscale'
        domain={ {data: 'table', field: 'amount'} }
        range='height'
        nice
      />
    </Scales>
    <Axes>
      <Axis orient='bottom' scale='xscale' />
      <Axis orient='left' scale='yscale' />
    </Axes>
    <Data
      name='table'
      values={[
        {category: 'A', amount: 28},
        {category: 'B', amount: 55},
        {category: 'C', amount: 43},
        {category: 'D', amount: 91},
        {category: 'E', amount: 81},
        {category: 'F', amount: 53},
        {category: 'G', amount: 19},
        {category: 'H', amount: 87},
      ]}
    />
    <Marks>
      <Mark
        type='rect'
        from={{data: 'table'}}
        encode={{
          enter: {
            x: {scale: 'xscale', field: 'category'},
            width: {scale: 'xscale', band: 1},
            y: {scale: 'yscale', field: 'amount'},
            y2: {scale: 'yscale', value: 0},
          },
          update: {
            fill: {value: 'steelblue'},
          }
        }}
      />
    </Marks>
  </Graph>
);

const prepareGraph = (graph) => {
  const result = {data: {$schema: graph.props.schema, data: [], signals: []}};
  graph.props.children.map(child => {
    let update = {};
    let children = child.props.children;
    if (!Array.isArray(children)) {
      children = [children];
    }
    switch (child.type) {
      case 'Size':
        update = JSON.parse(JSON.stringify(child.props));
        break;
      case 'Scales':
      case 'Axes':
      case 'Marks':
        update[child.type.toLowerCase()] = children.map(child => {
          return JSON.parse(JSON.stringify(child.props));
        });
        break;
      case 'Signals':
        // could recurse prepareGraph here
        update.signals = children.map(signal => {
          const result = Object.assign({}, signal.props);
          result.on = result.children.map(event => event.props);
          delete result.children;
          return result;
        });
        break;
      case 'Data':
        update.data = Object.assign([], result.data.data, [
          JSON.parse(JSON.stringify(child.props))
        ])
        break;
      case undefined:
        break;
      default:
        update = child;
        break;
    }
    if (update) {
      result.data = Object.assign({}, result.data, update);
    }
  });
  return result.data;
}

const graphdata = prepareGraph(Barchart);

const render = (spec) => {
  console.log('render');
  new vega.View(vega.parse(spec))
    .renderer('canvas')
    .initialize('#graph')
    .run();
  console.log('done')
}

// vega.loader()
//   .load('https://vega.github.io/vega/examples/bar-chart.vg.json')
  // .then(function(data) { render(JSON.parse(data)); });
console.log(JSON.stringify(graphdata, null, 2));

render(graphdata);

// export const chart = Visualization({ payload: convertToObject(barchart) });
