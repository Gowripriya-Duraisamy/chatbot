// Importing necessary components and styles from Material-UI and local modules
import { AppBar, Box, Toolbar, Button } from "@mui/material";
import { useCallback } from "react"; // Importing useCallback for memoizing functions
import useStore from "../../store"; // Importing custom hook to access global state

import classes from "./header.module.scss"; // Importing local styles for header

// Functional component for rendering the application header
const Header = () => {
  const { nodes, edges, setErrorMessage } = useStore(); // Accessing nodes, edges, and setErrorMessage from global state

  // Function to check if a node has an empty target handle in its edges
  const hasEmptyTargetHandle = useCallback((node, edges) => {
    const targetHandle = node.data.targetHandle || null; // Extracting target handle from node data or setting to null
    return !edges.some(
      (edge) => edge.target === node.id && edge.targetHandle === targetHandle
    ); // Checking if any edge points to the node with an empty target handle
  }, []);

  // Function to count nodes with empty target handles in the entire flow chart
  const countNodesWithEmptyTargetHandles = useCallback(
    (nodes, edges) => {
      return nodes.reduce((count, node) => {
        return hasEmptyTargetHandle(node, edges) ? count + 1 : count; // Increment count if node has an empty target handle
      }, 0);
    },
    [hasEmptyTargetHandle]
  );

  // Callback function to handle saving changes in the flow chart
  const handleSave = useCallback(() => {
    if (nodes.length > 1) { // Check if there are more than one node in the flow chart
      const count = countNodesWithEmptyTargetHandles(nodes, edges); // Count nodes with empty target handles
      if (count > 1) {
        setErrorMessage("Cannot save the flow: Multiple nodes have empty target handles."); // Display error message if multiple nodes have empty target handles
      } else {
        setErrorMessage(""); // Clear error message if all nodes have valid target handles
      }
    }
  }, [nodes, edges, countNodesWithEmptyTargetHandles, setErrorMessage]);

  // Render the header component with an AppBar, Toolbar, and Save Changes button
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar className={classes.appBar} position="static">
        <Toolbar className={classes.toolBar}>
          <Button
            variant="outlined"
            className={classes.customButton}
            onClick={handleSave} // Attach handleSave function to onClick event of Save Changes button
          >
            Save Changes
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header; // Export Header component as default
