import { Grid } from "@mui/material";
import useStore from "../../store";
import Flow from "../Flow";
import Header from "../Header";
import NodesPanel from "../NodesPanel/MessageNode";
import SettingsPanel from "../SettingsPanel";

import classes from "./builder.module.scss";
import ArrowMarker from "../Edge/ArrowMarker";
import { ReactFlowProvider } from "reactflow";

const Builder = () => {
  const { selectedNode } = useStore();
  return (
      <ReactFlowProvider>
      <Header />
      <Grid container>
        <Grid item xs={9.5} className={classes.flowGrid}>
          <Flow />
          <ArrowMarker />
        </Grid>
        <Grid item xs={2.5} className={classes.panelGrid}>
          {!selectedNode && <NodesPanel />}
          {selectedNode && <SettingsPanel />}
        </Grid>
      </Grid>
      </ReactFlowProvider>
  );
};

export default Builder;
