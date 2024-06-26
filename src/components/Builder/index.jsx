import { Grid } from "@mui/material";
import useStore from "../../store";
import Flow from "../Flow";
import Header from "../Header";
import NodesPanel from "../NodesPanel/MessageNode";
import SettingsPanel from "../SettingsPanel";

import classes from "./builder.module.scss";

const Builder = () => {
  const { selectedNode } = useStore();
  return (
    <>
      <Header />
      <Grid container>
        <Grid item xs={9.5} className={classes.flowGrid}>
          <Flow />
        </Grid>
        <Grid item xs={2.5} className={classes.panelGrid}>
          {!selectedNode && <NodesPanel />}
          {selectedNode && <SettingsPanel />}
        </Grid>
      </Grid>
    </>
  );
};

export default Builder;
