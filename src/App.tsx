import * as React from 'react';
import {Stage, Layer, Rect} from 'react-konva'
import './App.css';

class App extends React.Component {
  state = {
    color: 'blue'
  }
  render() {
    return (
      <div className="App">
        <Stage width={window.innerWidth} height={window.innerHeight} backgroundcolor={0x1099bb}>
          <Layer>
            <Rect
              x={50}
              y={50}
              width={50}
              height={50}
              fill={this.state.color}
              shadowBlur={10}
              onClick={this.handleClick}
              />
            </Layer>
        </Stage>
        
      </div>
    );
  }
}


export default App;
