import ReactFlow, { Background, Controls, addEdge } from "reactflow";
import { useCallback, useRef } from "react";
import useStore from "../../store";
import Message from "../NodesPanel/MessageNode";
import ArrowHead from "../Edge/CustomEdge";
import { Box, Snackbar, Alert } from "@mui/material";

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
  const {
    nodes,
    edges,
    setEdges,
    addNode,
    setSelectedNode,
    updateEdges,
    errorMessage,
    setErrorMessage,
    onNodesChange
  } = useStore();

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
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
          targetHandle: `target-handle-${(nodes.length + 1).toString()}`,
        },
      };

      addNode(newNode);
    },
    [addNode, nodes.length]
  );

  const onNodeClick = useCallback(
    (event, node) => {
      setSelectedNode(node);
    },
    [setSelectedNode]
  );

  const onConnect = useCallback(
    (params) => {
      // Check if there is already an edge from the source handle
      const existingEdge = edges.some(
        (edge) =>
          edge.source === params.source &&
          edge.sourceHandle === params.sourceHandle
      );

      if (!existingEdge) {
        updateEdges((eds) => addEdge({ id: `${params.source}-${params.target}`,  type: 'arrowHead', ...params }, eds));
      } else {
        console.log("Only one edge is allowed from a source handle.");
      }
    },
    [edges, updateEdges]
  );

  const isValidConnection = useCallback(
    (connection) => {
      // Prevent more than one edge from the same source handle
      const existingEdge = edges.some(
        (edge) =>
          edge.source === connection.source &&
          edge.sourceHandle === connection.sourceHandle
      );
      !!existingEdge && setErrorMessage("Only one edge is allowed from a source handle.")
      return !existingEdge;
    },
    [edges, setErrorMessage]
  );

  const handleClose = () => {
    setErrorMessage("");
  };

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
        edgeTypes={edgeTypes}
        onNodeClick={onNodeClick}
        onConnect={onConnect}
        onNodesChange={onNodesChange}
        onEdgesChange={setEdges}
        nodeTypes={nodeTypes}
        isValidConnection={isValidConnection}
        fitview={"true"}
        proOptions={{ hideAttribution: true }}
        className={classes.flow}
      >
        <Background />
        <Controls />
        <ArrowHead />
      </ReactFlow>
      {errorMessage && (
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={Boolean(errorMessage)}
          autoHideDuration={5000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="error">
            {errorMessage}
          </Alert>
        </Snackbar>
      )}
    </Box>
  );
};

export default Flow;
