import * as React from 'react';
import './App.css';
import { Graph } from './Graph/Graph';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Graph
          timeSteps={1}
        />
      </div>
    );
  }
  
}
export default App;
