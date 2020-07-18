import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { NavLink } from "react-router-dom";

import useHandleToken from "../hooks/useHandleToken";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  button: {
    "&.active": {
      backgroundColor: theme.palette.secondary.main,
    },
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  hd: {
    opacity: 0,
  },
}));

const Header = () => {
  const classes = useStyles();

  const { initedState, removeToken } = useHandleToken();

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Our awesome APP
        </Typography>
        {initedState === null && (
          <>
            <Button
              color="inherit"
              component={NavLink}
              exact
              to={"/"}
              className={classes.button}
            >
              Login
            </Button>
          </>
        )}
        {initedState !== null && (
          <>
            <Button
              color="inherit"
              component={NavLink}
              to={"/dashboard"}
              className={classes.button}
            >
              Dashboard
            </Button>
            <Button
              color="inherit"
              component={NavLink}
              to={"/"}
              onClick={() => removeToken()}
            >
              Logout
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};
export default Header;
