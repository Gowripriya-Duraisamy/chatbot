// Import necessary components and styles from libraries and local modules
import ReactFlow, { Background, Controls, addEdge } from "reactflow";
import { useCallback, useRef, useState } from "react";
import { Box, Snackbar, Alert, Grid } from "@mui/material";
import useStore from "../../store";
import Message from "../NodesPanel/MessageNode";
import ArrowHead from "../Edge/CustomEdge";
import SettingsPanel from "../SettingsPanel";
import ArrowMarker from "../Edge/ArrowMarker";

import classes from "./flow.module.scss"; // Import styles for Flow component
import "reactflow/dist/style.css"; // Import default styles for ReactFlow components

// Define node types using custom components
const nodeTypes = {
  message: Message,
};

// Define edge types using custom components
const edgeTypes = {
  arrowHead: ArrowHead,
};

// Functional component for rendering the flow chart application
const Flow = () => {
  const reactFlowWrapper = useRef(null); // Reference for the ReactFlow wrapper element
  const [selectedNode, setSelectedNode] = useState(null); // State to track selected node
  const [settingsKey, setSettingsKey] = useState(0); // State to force re-render SettingsPanel
  const {
    nodes,
    edges,
    setEdges,
    addNode,
    updateEdges,
    errorMessage,
    setErrorMessage,
    onNodesChange,
    updateEdge,
  } = useStore(); // Accessing state and methods from custom useStore hook

  // Callback function to handle drag over event for node placement
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  // Callback function to handle drop event for adding new nodes
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

      addNode(newNode); // Add new node to the flow chart
    },
    [addNode, nodes.length]
  );

  // Callback function to handle node click event for selecting a node
  const onNodeClick = useCallback(
    (_event, node) => {
      setSelectedNode(node); // Set selected node on click
      setSettingsKey((prevKey) => prevKey + 1); // Increment settings key to force SettingsPanel re-render
    },
    [setSelectedNode, setSettingsKey]
  );

  // Callback function to handle connection creation between nodes
  const onConnect = useCallback(
    (params) => {
      // Check if there is already an edge from the source handle
      const existingEdge = edges.some(
        (edge) =>
          edge.source === params.source &&
          edge.sourceHandle === params.sourceHandle
      );

      if (!existingEdge) {
        updateEdges((eds) =>
          addEdge(
            {
              id: `${params.source}-${params.target}`,
              type: "arrowHead",
              ...params,
            },
            eds
          )
        );
      } else {
        console.log("Only one edge is allowed from a source handle.");
      }
    },
    [edges, updateEdges]
  );

  // Callback function to handle edge update events
  const onEdgeUpdate = useCallback(
    (oldEdge, newConnection) => {
      // Validate the connection before updating
      const existingEdge = edges.find(
        (edge) =>
          edge.source === newConnection.source &&
          edge.sourceHandle === newConnection.sourceHandle
      );

      if (
        !existingEdge ||
        oldEdge.source === newConnection.source ||
        (existingEdge && oldEdge.targetHandle !== newConnection.targetHandle)
      ) {
        updateEdge(oldEdge, newConnection, edges);
      } else {
        setErrorMessage("Only one edge is allowed from a source handle.");
      }
    },
    [edges, updateEdge, setErrorMessage]
  );

  // Callback function to handle closing error message Snackbar
  const handleClose = () => {
    setErrorMessage("");
  };

  // Callback function to handle closing SettingsPanel
  const handleSettingsClose = () => {
    setSelectedNode(null); // Clear selected node to close SettingsPanel
  };

  // Callback function to handle edge click events (currently logging)
  const onEdgeClick = useCallback((event, edge) => {
    event.preventDefault();
    event.stopPropagation();
    console.log("Edge clicked:", edge);
  }, []);

  // Render the Flow component with grid layout
  return (
    <Grid container>
      <Grid item xs={9.5} className={classes.flowGrid}>
        <Box
          className={classes.flowBox}
          ref={reactFlowWrapper}
          onDrop={onDrop}
          onDragOver={onDragOver}
        >
          {/* ReactFlow component for rendering nodes and edges */}
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            onNodeClick={onNodeClick}
            onNodesChange={onNodesChange}
            edgeTypes={edgeTypes}
            onConnect={onConnect}
            onEdgesChange={(edges) => {
              // Prevent edge deletion
              setEdges(edges.filter((edge) => !edge.__rf?.deletable));
            }}
            onEdgeClick={onEdgeClick}
            onEdgeUpdate={onEdgeUpdate}
            fitview={"true"}
            proOptions={{ hideAttribution: true }}
            className={classes.flow}
            deleteKeyCode={null}
          >
            <Background />
            <Controls />
            <ArrowHead />
          </ReactFlow>

          {/* Snackbar for displaying error messages */}
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

        {/* ArrowMarker component for rendering custom arrow markers */}
        <ArrowMarker />
      </Grid>

      {/* Grid item for rendering side panel */}
      <Grid item xs={2.5} className={classes.panelGrid}>
        {/* Conditional rendering based on selectedNode */}
        {!selectedNode && <Message />} {/* Render Message component if no node is selected */}
        {selectedNode && (
          <SettingsPanel
            key={settingsKey}
            selectedNode={selectedNode}
            handleClose={handleSettingsClose}
          />
        )}
      </Grid>
    </Grid>
  );
};

export default Flow; // Export Flow component as default
