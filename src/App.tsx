import * as React from 'react';
import './App.css';
import { Graph } from './Graph/Graph';
import Dropdown from 'react-dropdown';
import { graphs } from './GraphData';

const options = graphs.map((value: any) => value.name);

class App extends React.Component {
 
 
  state = { 
    selectedGraph: 'default',
    graph: {nodes: graphs[0].nodes, edges: graphs[0].edges},
    timeSteps: 1,
  };
  constructor(props: any) {
    super(props);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.onSelect = this.onSelect.bind(this);

  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>nice</h2>
          <Dropdown 
            options={options} 
            onChange={this.onSelect}
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
 
  onSelect(e: any): void {
    let selIdx = 0;
    graphs.forEach((value, idx) => {
      
      if (value.name === e.label) {
        console.log(value.name, e.label);
        this.state.selectedGraph = value.name;
        selIdx = idx;
      }
    });
    console.log(graphs[selIdx]);
    this.setState({graph: graphs[selIdx]});
    
  }
}
export default App;
