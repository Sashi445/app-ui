import React, { useEffect } from "react";

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

  const getConnectionState = (fromPort: any, toPort: any) => {
    const fromObj = { name: fromPort.name, id: fromPort.id };
    const toObj = { name: toPort.name, id: toPort.id };
    const linkObj = { src: fromObj.id, to: toObj.id };
    return {
      components: [fromObj, toObj],
      links: [linkObj],
    };
  };

  useEffect(() => {
    model.registerListener({
      nodesUpdated: (e: any) => {
        console.log(e);
      },
      linksUpdated: (e: any) => {
        console.log(e.link);
        e.link.registerListener({
          sourcePortChanged: (event: any) => {
            console.log(event);
          },
          targetPortChanged: (event: any) => {
            const fromParent = e.link.sourcePort.parent.options;
            const toParent = event.port.parent.options;
            const connectionState = getConnectionState(fromParent, toParent);
            console.log(connectionState);
            fetch("http://127.0.0.1:5000/api/state/cache", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(connectionState),
            })
              .then((response) => response.json())
              .then((data) => {
                console.log("Success:", data);
              })
              .catch((error) => {
                console.error("Error:", error);
              });
          },
          selectionChanged: (event: any) => {
            console.log("SELECTION : ", event);
          },
        });
      },
      selectionChanged: (e: any) => {
        console.log(e);
      },
    });
    return () => {
      model.deregisterListener({});
    };
  }, []);

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

  another.setPosition(500, 600);
  another.addInPort("In");
  another.addOutPort("Out");

  const link = outPort.link<DefaultLinkModel>(inPort);
  link.addLabel("Hello, World!");

  model.addAll(source, destination, link, another);
  engine.setModel(model);

  return <CanvasWidget className="canvas" engine={engine} />;
}
