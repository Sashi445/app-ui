import React, {useState, useEffect} from "react";

import createEngine, {
  DefaultLinkModel,
  DefaultNodeModel,
  DiagramModel,
} from "@projectstorm/react-diagrams";

import { CanvasWidget } from "@projectstorm/react-canvas-core";

export default function () {
  // create an instance of the engine with all the defaults
  const engine = createEngine();
  const model = new DiagramModel();

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

  model.addAll(source, destination, link, another);
  engine.setModel(model);

  return <CanvasWidget className="canvas" engine={engine} />;
}
