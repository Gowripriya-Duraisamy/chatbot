// Importing necessary components and icons from Material-UI and react-icons libraries
import { Box, Grid, IconButton, Typography } from "@mui/material";
import { BiMessageRoundedDetail } from "react-icons/bi";
import { IoLogoWhatsapp } from "react-icons/io";
import { Handle, Position } from "reactflow";

// Importing component-specific styles
import classes from "./messageNode.module.scss";

// Functional component for MessageNode
const MessageNode = ({ data }) => {
  // Function to handle drag start event
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType); // Set data for drag operation
    event.dataTransfer.effectAllowed = "move"; // Set drag effect
  };

  // Render content to display in React flow chart
  if (data && data.header) {
    return (
      <Box className={classes.nodeBox}>
        {/* Container for node header and icons */}
        <Grid container className={classes.outerContainer}>
          <Grid container className={classes.containerGrid}>
            {/* Left part of header containing icon and title */}
            <Grid item xs={10} className={classes.headerLeftGrid}>
              <IconButton className={classes.iconButton}>
                <BiMessageRoundedDetail size={20} />
              </IconButton>
              <Typography className={classes.title}>{data.header}</Typography>
            </Grid>
            {/* Right part of header containing WhatsApp icon */}
            <Grid item xs={2}>
              <IconButton className={classes.iconButton}>
                <IoLogoWhatsapp className={classes.whatsappIcon} size={20} />
              </IconButton>
            </Grid>
          </Grid>
          {/* Content section */}
          <Grid item className={classes.contentGrid}>
            <Typography className={classes.content}>{data.content}</Typography>
          </Grid>
        </Grid>
        
        {/* Handles for connecting edges */}
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

  // Default render to display in NodesPanel
  return (
    <Box
      className={classes.messageBox}
      onDragStart={(event) => onDragStart(event, "message")} // Set drag behavior for default node
      draggable // Allow node to be draggable
    >
      <IconButton>
        <BiMessageRoundedDetail />
      </IconButton>
      <Typography>Message</Typography>
    </Box>
  );
};

export default MessageNode; // Export MessageNode component as default
