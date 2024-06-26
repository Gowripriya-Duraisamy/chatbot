import { AppBar, Box, Toolbar, Button } from "@mui/material";
import classes from "./header.module.scss"

const Header = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar className={classes.appBar} position="static">
        <Toolbar className={classes.toolBar}>
          <Button variant="outlined" className={classes.customButton}>Save Changes</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
