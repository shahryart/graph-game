import * as React from 'react';
import './App.css';
import { Graph } from './Graph/Graph';
import Dropdown from 'react-dropdown';
import { graphs } from './GraphData';

const options = graphs.map((value: any) => value.name);

export class Game extends React.Component {

  state = { 
    selectedGraph: 'default',
    graph: {nodes: graphs[1].nodes, edges: graphs[1].edges},
    timeSteps: 1,
  };
  constructor(props: any) {
    super(props);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.onDropDownSelect = this.onDropDownSelect.bind(this);
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>nice</h2>
          <Dropdown 
            options={options} 
            onChange={this.onDropDownSelect}
            placeholder={this.state.selectedGraph}
          />
          <input defaultValue="1" onChange={this.handleTextChange}/>
        </div>
        <p className="Planar Graph Game">
        <Graph
          graph={this.state.graph}
          timeSteps={this.state.timeSteps}
        />
        </p>
      </div>
    );
  }
  handleTextChange(e: any): void {
    let timeSteps = parseInt(e.target.value, 10);
    this.setState({timeSteps: timeSteps});
  }
  
 
  onDropDownSelect(e: any): void {
    let newGraphIdx = 0;
    graphs.forEach((value, idx) => {
      if (value.name === e.label) {
        console.log(value.name, e.label);
        this.state.selectedGraph = value.name;
        newGraphIdx = idx;
      }
    });
    this.setState({selectedGraph: e.label, graph: {nodes: graphs[newGraphIdx].nodes, 
      edges: graphs[newGraphIdx].edges}});
  }
}