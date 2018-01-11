import * as React from 'react';
import { Sigma, RandomizeNodePositions, RelativeSize } from 'react-sigma';

const Red: string = '#ff0000';
const Blue: string = '#0000ff';

type Node = {
  id: string,
  color: string,
  timeSteps: number,
  label: string,
};
type Edge = {
  id: string,
  source: string,
  target: string,
};


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
          <UpdateNodeProps nodes={this.props.nodes}/>
      </Sigma>
    );
  }
  
}
class UpdateNodeProps extends React.Component<any, any> {

  componentWillReceiveProps({ sigma, nodes }: any) {
    sigma.refresh();
    //sigma.graph.nodes().forEach((n: any) => {
    //  var updated = nodes.find((e: any) => e.id === n.id);
     // Object.assign(n, updated);
    //});
  }

  render() {
    return null;
  }

}

export class Graph extends React.Component<any, any> {
  timeSteps: number;
  contaminatedArray: Array<number>;
  state = {

    myGraph : {nodes: [
        {id: '1', color: Red, timeSteps: 0, label: ''}, 
        {id: '2', color: Red, timeSteps: 0, label: ''},
        {id: '3', color: Red, timeSteps: 0, label: ''}],
        edges: [{id: 'e1', source: '1', target: '2'},
                {id: 'e2', source: '2', target: '3'},
                {id: 'e3', source: '1', target: '3'}]},
    marker: '',
  };

  constructor(props: any) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.contaminatedArray = new Array(3);
    this.contaminatedArray.fill(1);
    this.timeSteps = props.timeSteps;
    this.state.myGraph.nodes.forEach((value) => {
      value.timeSteps = this.timeSteps;
      value.label = value.timeSteps.toString();
    });
   
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

    let edges = this.state.myGraph.edges.slice();
   
    let graphNodes = this.changeColor(e.data.node.id, this.state.myGraph.nodes.slice());
    graphNodes = this.adjustTimer(e.data.node.id, this.state.marker, graphNodes, edges);
    let markerChange = this.setMarker(e.data.node.id);
    this.setState({myGraph: {nodes: graphNodes, edges: edges}, marker: markerChange}, () => {
      console.log('rendered');
    });
  }

  adjustTimer(toMove: string, markerAt: string, graphNodes: Array<Node>, edges: Array<Edge>): Array<Node> {
    graphNodes.forEach((value) => {
      if (value.id === markerAt || value.id === toMove) {
        value.timeSteps = this.timeSteps;
        value.label = value.timeSteps.toString();
      } else {
        let adj = 0;
        edges.forEach((edge: any) => {
          if (edge.source === value.id) {
            if (this.contaminatedArray[parseInt(edge.target, 10)]) {
              adj = 1;
            }
          } else if (edge.target === value.id) {
            if (this.contaminatedArray[parseInt(edge.source, 10)]) {
              adj = 1;
            }
          }
        });
        if (adj === 1 && value.color === Blue) {
          value.timeSteps--;
          if (value.timeSteps === 0) {
            value.color = Red;
            value.timeSteps = this.timeSteps;
          }
          value.label = value.timeSteps.toString();
        }
      }
    });
    return graphNodes;
  }

  changeColor(id: string, graphNodes: Array<Node>): Array<Node> {
    graphNodes.forEach((value) => {
      if (value.id === id) {
        value.color = Blue;
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
