import { Box, IconButton, TextField, Typography, Divider } from "@mui/material";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useCallback, useState } from "react";
import useStore from "../../store";

import classes from "./settings.module.scss";

const SettingsPanel = ({ selectedNode, handleClose }) => {
  const { setNodes, nodes } = useStore(); // Accessing setNodes and nodes from custom hook useStore
  const [content, setContent] = useState(selectedNode.data.content || ""); // State to manage content of selectedNode

  // Callback function to handle content change in TextField
  const handleContentChange = useCallback(
    (event) => {
      const newContent = event.target.value;
      setContent(newContent); // Update local state with new content
      // Update nodes with new content for the selected node
      const newNodes = nodes.map((n) =>
        n.id === selectedNode.id
          ? { ...n, data: { ...n.data, content: newContent } } // Update content of selected node
          : n
      );
      setNodes(newNodes); // Update nodes in store with modified content
    },
    [setNodes, selectedNode.id, nodes, setContent] // Dependencies for useCallback
  );

  return (
    <Box>
      {/* Toolbar section */}
      <Box position="static" className={classes.toolBar}>
        <IconButton onClick={handleClose}>
          <IoIosArrowRoundBack />
        </IconButton>
        <Typography className={classes.header}>
          {/* Display node type as header */}
          {selectedNode.type.charAt(0).toUpperCase() +
            selectedNode.type.slice(1)}
        </Typography>
      </Box>
      {/* Divider for separating toolbar and content */}
      <Divider className={classes.headerdivider}></Divider>

      {/* Content section */}
      <Typography className={classes.contentHeader}>Text</Typography>
      <TextField
        rows={3}
        placeholder="start typing"
        multiline
        fullWidth
        onChange={handleContentChange} // Handle content change in TextField
        value={content} // Value of TextField set to local state content
      />
      <Divider className={classes.divider}></Divider>
    </Box>
  );
};

export default SettingsPanel;
