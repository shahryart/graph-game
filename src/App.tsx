import * as React from 'react';
import './App.css';
import { Graph } from './Graph/Graph';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>nice</h2>
        </div>
        <p className="Graph">
        <Graph
          timeSteps={1}
        />
        </p>
      </div>
    );
  }
  
}
export default App;
