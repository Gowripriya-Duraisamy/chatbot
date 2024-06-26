// MessageNode.js
import { Box, IconButton, Typography } from "@mui/material";
import { BiMessageRoundedDetail } from "react-icons/bi";
import { Handle, Position } from "reactflow";

import classes from "./messageNode.module.scss";

const MessageNode = ({ data }) => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  if (data && data.header) {
    return (
      <Box className={classes.nodeBox}>
        <Box>
          <IconButton>
            <BiMessageRoundedDetail />
          </IconButton>
          <Typography>{data.header}</Typography>
        </Box>
        <Typography>{data.content}</Typography>
        <Handle
          type="target"
          position={Position.Left}
          style={{ top: '50%', transform: 'translateY(-50%)', background: '#555' }}
        />
        <Handle
          type="source"
          position={Position.Right}
          style={{ top: '50%', transform: 'translateY(-50%)', background: '#555' }}
        />
      </Box>
    );
  }

  return (
    <Box
      className={classes.messageBox}
      onDragStart={(event) => onDragStart(event, "message")}
      draggable
    >
      <IconButton>
        <BiMessageRoundedDetail />
      </IconButton>
      <Typography>Message</Typography>
    </Box>
  );
};

export default MessageNode;
