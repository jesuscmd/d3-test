import React, { useState } from "react";

import { Box, Drawer, Toolbar, Typography } from "@material-ui/core";

import useHandleToken from "../hooks/useHandleToken";
import { useHistory } from "react-router-dom";

import Graph from "./Graph";
import { makeStyles } from "@material-ui/core/styles";

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    padding: theme.spacing(3),
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    textAlign: "center",
  },
}));

const Dashboard = () => {
  const history = useHistory();
  const classes = useStyles();
  const { initedState } = useHandleToken();

  initedState === null && history.push("/");

  const [currentData, updateCurrentData] = useState({});

  const showPathData = (pathData) => {
    updateCurrentData(pathData);
  };

  return (
    <>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Toolbar />
        <Graph onClickPath={showPathData} />
      </main>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="right"
      >
        <Toolbar />
        {currentData.name && (
          <>
            <Typography>Name:</Typography>
            <Typography variant="h2" gutterBottom>
              {currentData.name}
            </Typography>
          </>
        )}
        {currentData.size && (
          <Box flexGrow="1">
            <Typography>size:</Typography>
            <Typography variant="h2">{currentData.size}</Typography>

            {[...Array(currentData.size).keys()].map((elm) => {
              return (
                <Box
                  width="16px"
                  height="16px"
                  bgcolor="warning.main"
                  display="inline-block"
                  mr="16px"
                  borderRadius="50%"
                />
              );
            })}
          </Box>
        )}
        {currentData.children && (
          <Box>
            <Typography variant="h5" gutterBottom>
              Children:
            </Typography>

            {currentData.children.map((i) => {
              return (
                <Box display="flex" mb={2} mt={2}>
                  <Box mr={2} pr={2} borderRight={1}>
                    <Typography variant="body2">Name:</Typography>
                    <Typography variant="h6" gutterBottom>
                      {i.name}
                    </Typography>
                  </Box>
                  <Box flexGrow="1">
                    <Typography variant="body2">size:</Typography>
                    <Typography variant="h6" float="left">
                      {i.size}
                    </Typography>
                    {[...Array(i.size).keys()].map((elm) => {
                      return (
                        <Box
                          width="10px"
                          height="10px"
                          bgcolor="warning.main"
                          display="inline-block"
                          mr="10px"
                          borderRadius="50%"
                        />
                      );
                    })}
                  </Box>
                </Box>
              );
            })}
          </Box>
        )}
      </Drawer>
    </>
  );
};

export default Dashboard;
