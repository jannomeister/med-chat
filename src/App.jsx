import React, { useEffect, useState } from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Chat from "./pages/Chat";
import Groups from "./pages/Groups";
import GroupChat from "./pages/GroupChat";
import { auth } from "./services/firebase";

import "./App.css";

function PrivateRoute({ component: Component, authenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated === true ? (
          <Component {...rest} />
        ) : (
          // <Redirect
          //   to={{ pathname: "/login", state: { from: props.location } }}
          // />
          <Redirect to="/login" />
        )
      }
    />
  );
}

function PublicRoute({ component: Component, authenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated === false ? (
          <Component {...props} />
        ) : (
          <Redirect to="/groups" />
        )
      }
    />
  );
}

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

  return loading ? (
    <div>
      <span>Loading...</span>
    </div>
  ) : (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <PrivateRoute
          path="/chat"
          authenticated={authenticated}
          component={Chat}
        />
        <PrivateRoute
          path="/groups"
          authenticated={authenticated}
          exact
          component={Groups}
        />
        <PrivateRoute
          path="/groups/:id"
          authenticated={authenticated}
          component={GroupChat}
        />
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
    </Router>
  );
}

export default App;
