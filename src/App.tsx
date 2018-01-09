import * as React from 'react';
import { Sigma, RandomizeNodePositions, RelativeSize } from 'react-sigma';
import './App.css';

type Node = {
  id: string,
  color: string,
};

class Graph extends React.Component {
  state = {

    myGraph : {nodes: [
        {id: 'n1', color: '#ff0000'}, 
        {id: 'n2', color: '#ff0000'}], 
        edges: [{id: 'e1', source: 'n1', target: 'n2'}]},
    marker: '',

  };
  constructor(props: any) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  render() {
    return (

        <Sigma 
          style={{width: '800px', height: '800px'}} 
          graph={this.state.myGraph} 
          settings={{drawEdges: true, clone: false,
                     edgeColor: 'default'}}
          onClickNode={this.handleClick}
        >
          <RelativeSize initialSize={15}/>
          <RandomizeNodePositions/>
        </Sigma>
    );
  }
  handleClick(e: any) {

    let edgeNodes = this.state.myGraph.edges;
    let graphNodes = this.changeColor(e.data.node.id);
    let markerChange = this.setMarker(e.data.node.id);
    this.setState({myGraph: {nodes: graphNodes, edges: edgeNodes}, marker: markerChange});
    console.log(this.state.myGraph);

  }

  changeColor(id: string): Array<Node> {
    let graphNodes = this.state.myGraph.nodes.slice();
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
