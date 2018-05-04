/* Vega visualization module. */
import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { loader, View, parse, changeset, Debug } from 'vega-lib';

console.log(parse);

class VegaSpec extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: null
    };
    this.shouldComponentUpdate =
      PureRenderMixin
      .shouldComponentUpdate
      .bind(this);
    this.spec = {
      "$schema": "https://vega.github.io/schema/vega/v3.0.json",
      "autosize": "pad",
      "padding": 5,
      "width": 200,
      "height": 200,
      "style": "cell",
      "data": [
        {"name": "source_0", "values": [{"x": 1, "y": 1}, {"x": 2, "y": 2}]},
        {
          "name": "data_0",
          "source": "source_0",
          "transform": [
            {"type": "formula", "expr": "toNumber(datum[\"x\"])", "as": "x"},
            {"type": "formula", "expr": "toNumber(datum[\"y\"])", "as": "y"},
            {
              "type": "filter",
              "expr": "datum[\"x\"] !== null && !isNaN(datum[\"x\"]) && datum[\"y\"] !== null && !isNaN(datum[\"y\"])"
            }
          ]
        }
      ],
      "marks": [
        {
          "name": "marks",
          "type": "symbol",
          "style": ["point"],
          "from": {"data": "data_0"},
          "encode": {
            "update": {
              "opacity": {"value": 0.9},
              "fill": {"value": "steelblue"},
              "stroke": {"value": "transparent"},
              "x": {"scale": "x", "field": "x"},
              "y": {"scale": "y", "field": "y"}
            }
          }
        }
      ],
      "scales": [
        {
          "name": "x",
          "type": "linear",
          "domain": {"data": "data_0", "field": "x"},
          "range": [0, {"signal": "width"}],
          "nice": true,
          "zero": true
        },
        {
          "name": "y",
          "type": "linear",
          "domain": {"data": "data_0", "field": "y"},
          "range": [{"signal": "height"}, 0],
          "nice": true,
          "zero": true
        }
      ],
      "axes": [
        {
          "scale": "x",
          "orient": "bottom",
          "title": "x",
          "labelFlush": true,
          "labelOverlap": true,
          "tickCount": {"signal": "ceil(width/40)"},
          "zindex": 1
        },
        {
          "scale": "x",
          "orient": "bottom",
          "grid": true,
          "tickCount": {"signal": "ceil(width/40)"},
          "gridScale": "y",
          "domain": false,
          "labels": false,
          "maxExtent": 0,
          "minExtent": 0,
          "ticks": false,
          "zindex": 0
        },
        {
          "scale": "y",
          "orient": "left",
          "title": "y",
          "labelOverlap": true,
          "tickCount": {"signal": "ceil(height/40)"},
          "zindex": 1
        },
        {
          "scale": "y",
          "orient": "left",
          "grid": true,
          "tickCount": {"signal": "ceil(height/40)"},
          "gridScale": "x",
          "domain": false,
          "labels": false,
          "maxExtent": 0,
          "minExtent": 0,
          "ticks": false,
          "zindex": 0
        }
      ],
      "config": {
        "axisY": {"minExtent": 30},
        "axis": {
          "titleColor": "#aaa",
          "labelColor": "#aaa",
          "domainColor": "#444",
          "gridColor": "#444"
        },

      }
    }
  }

  componentDidMount() {
    const { data } = this.props;
    const spec = this.spec;
    // let view;

    // vega.loader()
    //   .load('https://vega.github.io/vega/examples/bar-chart.vg.json')
    //   .then(data => {
    //     const spec = JSON.parse(data);
    //     console.log(data);
    const view = new vega.View(vega.parse(spec))
      .renderer('canvas')
      .initialize(this.refs.chartContainer)
      .hover()
      .run();
    this.setState({ view });
      // });
  }

  componentWillUnmount() {
    if (this.state.view) {
      this.state.view.finalize();
    }
  }

  componentDidUpdate() {
    const { view } = this.state;
    const { data } = this.props;
    if (view) {
      const all = () => true;
      view.change(
        'data_0',
        vega.changeset()
          .remove(all)
          .insert(data)
      ).run();
    }
    console.log('...')
    console.log(view.getState());
    console.log('...')
  }

  render() {
    return <div ref='chartContainer'></div>
  }
}

export default VegaSpec;
