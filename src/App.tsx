import * as React from 'react';
import {Stage, Layer, Circle} from 'react-konva'
import './App.css';







class Graph extends React.Component {
  state = {
    graphMatrix: [[]],
    marker: [,],
  }
  render() {
    return(

      
     
    );
  }
  handleClick() {



  }
}

class Node extends React.Component {
  state = {
    cleaned: false,
  }
  render() {
    return(
      <Circle
      x={50}
      y={50}
      radius={20}
      fill={this.state.cleaned ? 'red':'blue'}
      shadowBlur={5}
      shadowEnabled={true}
      />
    );
  }
}


class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Stage width={window.innerWidth} height={window.innerHeight} backgroundcolor={0x1099bb}>
          <Layer>
            <Graph/>
            </Layer>
        </Stage>
        
      </div>
    );
  }
  handleClick() {


  }
}


export default App;
