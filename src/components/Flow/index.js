import ReactFlow, { Background, addEdge } from "reactflow";
import { useCallback,useRef } from "react";
import { Box } from "@mui/material";
import useStore from "../../store";
import Message from "../NodesPanel/MessageNode";

import classes from "./flow.module.scss";
import "reactflow/dist/style.css";

const nodeTypes = {
  message: Message,
};

const Flow = () => {
  const reactFlowWrapper = useRef(null);
  const { nodes, onNodesChange, edges, setEdges, addNode, setSelectedNode, onEdgesChange } = useStore();

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback((event) => {
    event.preventDefault();

    const reactFlowBounds = event.target.getBoundingClientRect();
    const type = event.dataTransfer.getData("application/reactflow");
    if (!type) return;
    const position = {
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    };

    const newNode = {
      id: (nodes.length + 1).toString(),
      type,
      position,
      data: {
        id:(nodes.length + 1).toString(),
        target: [],
        sources: 1,
        label: `${type.charAt(0).toUpperCase() + type.slice(1)} Node`,
        header: "Send Message",
        content: `Text message ${(nodes.length + 1).toString()}`,
      },
    };

    addNode(newNode);
  }, [addNode, nodes.length]);

  const onNodeClick = useCallback((event, node) => {
    setSelectedNode(node);
  }, [setSelectedNode]);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <Box
      className={classes.flowBox}
      ref={reactFlowWrapper}
      onDrop={onDrop}
      onDragOver={onDragOver}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitview={"true"}
        proOptions={{ hideAttribution: true }}
        className={classes.flow}
      >
        <Background />
      </ReactFlow>
    </Box>
  );
};

export default Flow;
