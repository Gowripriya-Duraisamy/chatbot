import ReactFlow, { Background, Controls  } from "reactflow";
import { useCallback,useRef } from "react";
import useStore from "../../store";
import Message from "../NodesPanel/MessageNode";
import ArrowHead from "../Edge/CustomEdge";
import { Box } from '@mui/material';

import classes from "./flow.module.scss";
import "reactflow/dist/style.css";

const nodeTypes = {
  message: Message,
};

const edgeTypes = {
  arrowHead: ArrowHead,
};

const Flow = () => {
  const reactFlowWrapper = useRef(null);
  const { nodes, edges, setEdges, addNode, setSelectedNode, onNodesChange } = useStore();

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
        header: "Send Message",
        content: `Text message ${(nodes.length + 1).toString()}`,
        targetHandle: `target-handle-${(nodes.length + 1).toString()}`
      },
    };

    addNode(newNode);
  }, [addNode, nodes.length]);

  const onNodeClick = useCallback((event, node) => {
    setSelectedNode(node);
  }, [setSelectedNode]);

  const onConnect = useCallback((params) => {
    const newEdges = [...edges, { id: `${params.source}-${params.target}`,  type: 'arrowHead', ...params } ]
    setEdges(newEdges);
  }, [edges, setEdges]);

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
        onNodeClick={onNodeClick}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitview={"true"}
        proOptions={{ hideAttribution: true }}
        className={classes.flow}
      >
        <Background />
        <Controls />
        <ArrowHead /> 
      </ReactFlow>
    </Box>
  );
};

export default Flow;
