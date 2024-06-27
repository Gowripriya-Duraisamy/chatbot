import ReactFlow, { Background, Controls, addEdge } from "reactflow";
import { useCallback, useRef, useState } from "react";
import useStore from "../../store";
import Message from "../NodesPanel/MessageNode";
import ArrowHead from "../Edge/CustomEdge";
import { Box, Snackbar, Alert, Grid } from "@mui/material";
import SettingsPanel from "../SettingsPanel";
import ArrowMarker from "../Edge/ArrowMarker";

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
  const [selectedNode, setSelectedNode] = useState(null);
  const [settingsKey, setSettingsKey] = useState(0);
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
    (_event, node) => {
      setSelectedNode(node);
      setSettingsKey((prevKey) => prevKey + 1);
    },
    [setSelectedNode, setSettingsKey]
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

  const handleClose = () => {
    setErrorMessage("");
  };
  const handleSettingsClose = () => {
    setSelectedNode(null);
  };

  const onEdgeClick = useCallback((event, edge) => {
    event.preventDefault();
    event.stopPropagation();
    console.log("Edge clicked:", edge);
  }, []);

  return (
    <Grid container>
      <Grid item xs={9.5} className={classes.flowGrid}>
        <Box
          className={classes.flowBox}
          ref={reactFlowWrapper}
          onDrop={onDrop}
          onDragOver={onDragOver}
        >
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
        <ArrowMarker />
      </Grid>
      <Grid item xs={2.5} className={classes.panelGrid}>
        {!selectedNode && <Message />}
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

export default Flow;
