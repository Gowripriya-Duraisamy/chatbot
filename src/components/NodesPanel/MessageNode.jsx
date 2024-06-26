import { Box, IconButton, Typography } from "@mui/material";
import { BiMessageRoundedDetail } from "react-icons/bi";

import classes from "./messageNode.module.scss";

const MessageNode = ({ data }) => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };
  if (data && data.header) {
    return (
      <Box  className={classes.nodeBox}>
        <Box>
          <IconButton>
            <BiMessageRoundedDetail />
          </IconButton>
          <Typography>{data.header}</Typography>
        </Box>
        <Typography>{data.content}</Typography>
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
