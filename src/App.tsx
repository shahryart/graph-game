import * as React from 'react';
import { Sigma, RandomizeNodePositions, RelativeSize } from 'react-sigma';
import './App.css';

type Node = {
  id: string,
  color: string,
  timeSteps: number,
};
const timeSteps = 3;

class GraphInitializer extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
  }
  render() {
    return (

        <Sigma 
          renderer="canvas"
          style={{width: '800px', height: '800px'}} 
          graph={this.props.graph} 
          settings={{drawEdges: true, clone: false,
                     edgeColor: 'default',
                     enableHovering: false}}
          onClickNode={(e: any) => this.props.onClickNode(e)}
        >
          <RelativeSize initialSize={20}/>
          <RandomizeNodePositions/>
        </Sigma>
    );
  }
  componentDidUpdate(prevProps: any, prevState: any) {
   
   
  }
}

class Graph extends React.Component {
  state = {

    myGraph : {nodes: [
        {id: 'n1', color: '#ff0000', timeSteps: timeSteps}, 
        {id: 'n2', color: '#ff0000', timeSteps: timeSteps}], 
        edges: [{id: 'e1', source: 'n1', target: 'n2'}]},
    marker: '',

  };
  componentDidUpdate(prevProps: any, prevState: any) {
    console.log('graph prevProps', prevProps);
    console.log('graph prevState', prevState);

  }

  constructor(props: any) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  
  render() {
    return (
      <GraphInitializer
        graph={this.state.myGraph}
        onClickNode={this.handleClick}
      />
    );
  }
    
  handleClick(e: any) {

    //if (this.state.marker === e.data.node.id) {
    //  return;
    //}

    let edgeNodes = this.state.myGraph.edges.slice();
   
    let graphNodes = this.changeColor(e.data.node.id, this.state.myGraph.nodes.slice());
    graphNodes = this.decrementTimer(e.data.node.id, this.state.marker, graphNodes);
    let markerChange = this.setMarker(e.data.node.id);
    this.setState({myGraph: {nodes: graphNodes, edges: edgeNodes}, marker: markerChange}, () => {
      console.log('rendered');
    });
   

  }

  decrementTimer(toMove: string, markerAt: string, graphNodes: Array<Node>): Array<Node> {
    graphNodes.forEach((value) => {
      if (value.id === markerAt || value.id === toMove) {
        value.timeSteps = timeSteps;
      } else {
        value.timeSteps--;
      }
    });
    return graphNodes;
  }

  changeColor(id: string, graphNodes: Array<Node>): Array<Node> {
    graphNodes.forEach((value) => {
      if (value.id === id) {
        value.color = '#0000ff';
      }
    });
    return graphNodes;
  }

  setMarker(id: string): string {
    let currMarker = this.state.marker;
    if (currMarker === '') {
      currMarker = id;
      
    } else {
      this.state.myGraph.edges.forEach((value) => {
        if (value.source === currMarker && value.target === id) {
          currMarker = value.target;
        } else if (value.source === id && value.target === currMarker) {
          currMarker = value.source;
        }
      });
    }
    return currMarker;
  }
  
}

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Graph />
      </div>
    );
  }
  
}
export default App;
