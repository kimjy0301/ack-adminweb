import React from "react";
import Main from "./components/Main";
import { BrowserRouter as Router, Switch, Link, Route } from "react-router-dom";
import Login from "./components/Login";
import PrivateRoute from "./lib/PrivateRoute";
import Private from "./components/Private";

const App = () => {
  return (
    <>
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/">Main</Link>
            </li>
            <li>
              <Link to="/private">private</Link>
            </li>
          </ul>

          <hr />

          <Switch>
            <Route exact path="/">
              <Main></Main>
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <PrivateRoute path="/private">
              <Private />
            </PrivateRoute>
          </Switch>
        </div>
      </Router>
    </>
  );
};

export default App;
