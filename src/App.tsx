import * as React from 'react';
import './App.css';
import { Graph } from './Graph/Graph';
import Dropdown from 'react-dropdown';

const options = [ 'default-triangle'];

class App extends React.Component {
  timeSteps: number = 0;
  state = {
   
    graph: undefined,
    timeSteps: 1,

  };
  constructor(props: any) {
    super(props);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>nice</h2>
          <Dropdown 
            options={options} 
            onChange={this.onSelect}
            placeholder="Select an option" 
          />
          <input defaultValue="1" onChange={this.handleTextChange}/>
          <button type="change" className="btn btn-primary" onClick={this.handleClick}>Change</button>
        </div>
        <p className="Planar Graph Game">
        <Graph
          timeSteps={this.state.timeSteps}
        />
        </p>
      </div>
    );
  }
  handleTextChange(e: any): void {
    this.timeSteps = parseInt(e.target.value, 10);
  }
  handleClick(): void {
    let i = this.timeSteps;
    this.setState({graph: undefined, timeSteps: i});
  }
  onSelect(): void {
    return;
  }
}
export default App;
