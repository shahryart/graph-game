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
    this.state = {
      graphKey: this.props.graphKey,
      renderGraph: this.props.graph,
    };
  }
  render() {
    return (
      <Sigma
          renderer="canvas"
          style={{width: '600px', height: '400px'}} 
          settings={{drawEdges: true, clone: false,
                     edgeColor: 'default',
                     enableHovering: false,
                     enableCamera: false,
                     defaultNodeBorderColor: '#000',
                     minNodeSize: 15,
                     maxNodeSize: 15}}
          onClickNode={(e: any) => this.props.onClickNode(e)}
      >
      <GraphChild graph={this.state.renderGraph}/>
          <RelativeSize initialSize={15} key={this.state.graphKey}/>
          <RandomizeNodePositions key={this.state.graphKey}/>
          <UpdateNodeProps graph={this.state.renderGraph}/>
      </Sigma>
    );
  }
  componentWillReceiveProps(props: any) {
    let newGraph = props.graph;
    let newGraphKey = props.graphKey;
    console.log('initializer component received props', newGraph, newGraphKey);
    this.setState({graphKey: newGraphKey, renderGraph: newGraph});
  }
}
class GraphChild extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.props.sigma.graph.read(props.graph);
    this.props.sigma.refresh();
  }
  render() {
    return null;
  }
  componentWillReceiveProps({ sigma, graph }: any) {
    this.props.sigma.graph.clear();
    this.props.sigma.graph.read(graph);
    this.props.sigma.refresh();
  }
}
class UpdateNodeProps extends React.Component<any, any> {
  componentWillReceiveProps({ sigma, graph }: any) {
    sigma.refresh();
  }

  render() {
    return null;
  }

}

export class Graph extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
    this.state = {
     graphKey: 0,
     myGraph : this.props.graph,
     marker: '',
     contaminatedArray: new Array(this.props.graph.nodes.length).fill(1),
     timeSteps: this.props.timeSteps,
    };
    this.handleClick = this.handleClick.bind(this);
    this.state.myGraph = this.initialize(this.state.myGraph, this.props.timeSteps);
  }
  
  render() {
    return (
      <GraphInitializer
        graphKey={this.state.graphKey}
        graph={this.state.myGraph}
        onClickNode={this.handleClick}
      />
    );
  }
    
  handleClick(e: any) {
    let edges = this.state.myGraph.edges.slice();
    let [graphNodes, contaminatedArray] = this.adjustTimer(e.data.node.id, 
                                                           this.state.marker, 
                                                           this.state.myGraph.nodes.slice(), 
                                                           edges);
    let markerChange = this.setMarker(e.data.node.id);
    console.log('change', contaminatedArray);

    this.setState({
      myGraph: {nodes: graphNodes, edges: edges},
      marker: markerChange,
      contaminatedArray: contaminatedArray
    });
  }
  contaminated(id: string): boolean {
    if (this.state.contaminatedArray[parseInt(id, 10)]) {
      return true;
    } else {
      return false;
    }
  }

  adjustTimer(toMove: string, markerAt: string, graphNodes: Array<Node>, edges: Array<Edge>): 
  [Array<Node>, Array<number>] {
    let contaminatedArray = this.state.contaminatedArray.slice();

    graphNodes.forEach((value) => {

      if (value.id === markerAt || value.id === toMove) {

        value.timeSteps = this.state.timeSteps;
        value.label = '';
        contaminatedArray[parseInt(value.id, 10)] = 0;
        value.color = Blue;

      } else {

        if (this.adjacentContaminated(edges, value) && !this.contaminated(value.id)) {
          value.timeSteps--;
          if (value.timeSteps === 0) {
            value.color = Red;
            value.timeSteps = this.state.timeSteps;
            value.label = value.timeSteps.toString();
            contaminatedArray[parseInt(value.id, 10)] = 1;
          }
        }

      }
    });
    return [graphNodes, contaminatedArray];
  }
  adjacentContaminated(edges: Array<Edge>, node: Node): boolean {

    let adj = 0;

    edges.forEach((edge: any) => {
      if (edge.source === node.id) {
        if (this.state.contaminatedArray[parseInt(edge.target, 10)]) {
          adj = 1;
        }
      } else if (edge.target === node.id) {
        if (this.state.contaminatedArray[parseInt(edge.source, 10)]) {
          adj = 1;
        }
      }
    });

    if (adj) {
      return true;
    } else {
      return false;
    }
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
      this.state.myGraph.edges.forEach((value: any) => {
        if (value.source === currMarker && value.target === id) {
          currMarker = value.target;
        } else if (value.source === id && value.target === currMarker) {
          currMarker = value.source;
        }
      });
    }
    return currMarker;
  }

  componentWillReceiveProps(props: any) {
    
    let newGraph = this.initialize(props.graph, props.timeSteps);
    this.setState({
      graphKey: this.state.graphKey + 1, 
      myGraph: newGraph, 
      marker: '',
    });
  }

  initialize(graph: any, timeSteps: number): any {

    graph.nodes.forEach((value: any) => {
      value.timeSteps = timeSteps;
    });
    return graph;

  }
 
}
