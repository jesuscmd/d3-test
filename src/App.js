import React from "react";

import SignIn from "./components/SignIn";
import Dashboard from "./components/Dashboard";
import Header from "./components/Header";

import { Box } from "@material-ui/core/";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// function App() {

const App = () => {
  return (
    <Router>
      <Box display="flex">
        <Header />
        <Switch>
          <Route path="/" exact={true} component={() => <SignIn />}></Route>
          <Route path="/dashboard" exact={true} component={Dashboard}></Route>
        </Switch>
      </Box>
    </Router>
  );
};

export default App;
