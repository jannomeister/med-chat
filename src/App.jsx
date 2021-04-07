import React, { useEffect, useState } from "react";
import { Link, Route, Switch, useRouteMatch } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Chat from "./pages/Chat";
import NewGroup from "./pages/NewGroup";
import Groups from "./pages/Groups";
import GroupChat from "./pages/GroupChat";
import { auth } from "./services/firebase";

// routes
import PublicRoute from "./routes/PublicRoute";
import PrivateRoute from "./routes/PrivateRoute";

import "./App.css";

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    auth().onAuthStateChanged((user) => {
      if (user) {
        setAuthenticated(true);
        setLoading(false);
      } else {
        setAuthenticated(false);
        setLoading(false);
      }
    });
  }, []);

  if (loading) {
    return (
      <div>
        <span>Loading...</span>
      </div>
    );
  }

  return (
    <Switch>
      <Route exact path="/" component={Home} />
      {/* <PrivateRoute
      path="/chat"
      authenticated={authenticated}
      component={Chat}
    /> */}
      <PrivateRoute
        path="/e"
        authenticated={authenticated}
        component={Dashboard}
      />
      {/* <PrivateRoute
      path="/new/group"
      authenticated={authenticated}
      exact
      component={NewGroup}
      /> */}
      {/* <PrivateRoute
        path="/messages/t/:id"
        authenticated={authenticated}
        component={GroupChat}
      /> */}
      <PublicRoute
        path="/login"
        authenticated={authenticated}
        component={Login}
      />
      <PublicRoute
        path="/signup"
        authenticated={authenticated}
        component={Signup}
      />
    </Switch>
  );
}

export default App;
