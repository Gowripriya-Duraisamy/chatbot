// MessageNode.js
import { Box, Grid, IconButton, Typography } from "@mui/material";
import { BiMessageRoundedDetail } from "react-icons/bi";
import { Handle, Position } from "reactflow";

import classes from "./messageNode.module.scss";
import { IoLogoWhatsapp } from "react-icons/io";
const MessageNode = ({ data }) => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  if (data && data.header) {
    return (
      <Box className={classes.nodeBox}>
        <Grid container className={classes.outerContainer}>
        <Grid container className={classes.containerGrid}>
          <Grid item xs={10} className={classes.headerLeftGrid}>
            <IconButton className={classes.iconButton}>
              <BiMessageRoundedDetail size={20} />
            </IconButton>
            <Typography className={classes.title}>{data.header}</Typography>
          </Grid>
          <Grid item xs={2}>
            <IconButton className={classes.iconButton}>
              <IoLogoWhatsapp className={classes.whatsappIcon} size={20} />
            </IconButton>
          </Grid>
        </Grid>
        <Grid item className={classes.contentGrid}><Typography className={classes.content}>{data.content}</Typography></Grid>
        </Grid>
        <Handle
          type="target"
          id={data.targetHandle}
          position={Position.Left}
          style={{
            top: "50%",
            transform: "translateY(-50%)",
            background: "#555",
          }}
        />
        <Handle
          type="source"
          position={Position.Right}
          style={{
            top: "50%",
            transform: "translateY(-50%)",
            background: "#555",
          }}
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
