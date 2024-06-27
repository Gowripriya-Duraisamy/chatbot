import { Box, IconButton, TextField, Typography, Divider } from "@mui/material";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useCallback, useState } from "react";
import useStore from "../../store";

import classes from "./settings.module.scss";

const SettingsPanel = ({selectedNode, handleClose}) => {
  const {  setNodes, nodes} = useStore();
  const [content, setContent] = useState(selectedNode.data.content || "");

  const handleContentChange = useCallback(
    (event) => {
      const newContent = event.target.value;
      setContent(newContent);
      const newNodes = nodes.map((n) =>
        n.id === selectedNode.id
          ? { ...n, data: { ...n.data, content: newContent } }
          : n
      );
      setNodes(newNodes);
    },
    [setNodes, selectedNode.id, nodes, setContent]
  );

  return (
    <Box>
      <Box position="static" className={classes.toolBar}>
        <IconButton onClick={handleClose}>
          <IoIosArrowRoundBack />
        </IconButton>
        <Typography className={classes.header}>
          {selectedNode.type.charAt(0).toUpperCase() +
            selectedNode.type.slice(1)}
        </Typography>
      </Box>
      <Divider className={classes.headerdivider}></Divider>

      <Typography className={classes.contentHeader}>Text</Typography>
      <TextField
        rows={3}
        placeholder="start typing"
        multiline
        fullWidth
        onChange={handleContentChange}
        value={content}
      />
      <Divider className={classes.divider}></Divider>
    </Box>
  );
};

export default SettingsPanel;
