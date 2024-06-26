import { AppBar, Box, Toolbar, Button, Snackbar, Alert } from "@mui/material";
import classes from "./header.module.scss";
import useStore from "../../store";
import { useCallback } from "react";

const Header = () => {
  const { nodes, edges, setErrorMessage, errorMessage } = useStore();

  const hasEmptyTargetHandle = useCallback((node, edges) => {
    const targetHandle = node.data.targetHandle || null;
    return !edges.some(
      (edge) => edge.target === node.id && edge.targetHandle === targetHandle
    );
  }, []);

  const countNodesWithEmptyTargetHandles = useCallback(
    (nodes, edges) => {
      return nodes.reduce((count, node) => {
        return hasEmptyTargetHandle(node, edges) ? count + 1 : count;
      }, 0);
    },
    [hasEmptyTargetHandle]
  );

  const handleSave = useCallback(() => {
    if (nodes.length > 1) {
      const count = countNodesWithEmptyTargetHandles(nodes, edges);
      if (count > 1) {
        setErrorMessage("cannot save the flow");
      } else {
        setErrorMessage("");
      }
    }
  }, [nodes, edges, countNodesWithEmptyTargetHandles, setErrorMessage]);

  const handleClose = () => {
    setErrorMessage("");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar className={classes.appBar} position="static">
        <Toolbar className={classes.toolBar}>
          <Button
            variant="outlined"
            className={classes.customButton}
            onClick={handleSave}
          >
            Save Changes
          </Button>
          {errorMessage && (
            <Snackbar
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
              open={Boolean(errorMessage)}
              autoHideDuration={6000}
              onClose={handleClose}
            >
              <Alert onClose={handleClose} severity="error">
                {errorMessage}
              </Alert>
            </Snackbar>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
