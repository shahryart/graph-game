import * as React from 'react';
import './App.css';
import { Graph } from './Graph/Graph';
import Dropdown from 'react-dropdown';

const options = [ 'default-triangle'];

class App extends React.Component {
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
          <input ref="input" defaultValue="1"/>
          <button type="change" className="btn btn-primary">Change</button>
        </div>
        <p className="Planar Graph Game">
        <Graph
          timeSteps={1}
        />
        </p>
      </div>
    );
  }
  onSelect(): void {
    return;
  }

  
}
export default App;
