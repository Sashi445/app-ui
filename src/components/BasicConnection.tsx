import * as React from "react";

import createEngine, {
  DefaultLinkModel,
  DefaultNodeModel,
  DiagramModel,
} from "@projectstorm/react-diagrams";

import { CanvasWidget } from "@projectstorm/react-canvas-core";

export default function () {
  // create an instance of the engine with all the defaults
  const engine = createEngine();

  // source
  const source = new DefaultNodeModel({
    name: "Source",
    color: "rgb(0, 192, 255)",
  });
  source.setPosition(300, 300);
  let outPort = source.addOutPort("Out");

  // destination
  const destination = new DefaultNodeModel({
    name: "Destination",
    color: "rgb(0, 192, 0)",
  });
  destination.setPosition(500, 300);
  let inPort = destination.addInPort("In");

  const another = new DefaultNodeModel({
    name: "Another",
    color: "rgb(240, 1, 3)",
  });

  another.setPosition(600, 700);
  another.addInPort("In");
  another.addOutPort("Out");

  const link = outPort.link<DefaultLinkModel>(inPort);
  link.addLabel("Hello, World!");

  const model = new DiagramModel();
  const models = [source, destination, another, link];
  model.addAll(...models);

  engine.setModel(model);

  model.registerListener({
    nodesUpdated: (e :any) => { console.log("Nodes Updated : ", e)},
    linksUpdated: (e :any) => { console.log("Link update event : ", e) },
    selectionChanged : (e :any) => {console.log(e)},
    zoomUpdated: (e :any) => {console.log("zoom event : ",  e)},
  });

  link.registerListener({
    sourcePortChanged : (e : any) => {console.log(e)},
    selectionChanged : (e : any) => {console.log(e)}
  })

  return <CanvasWidget className="canvas" engine={engine} />;
}
