import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
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
      <PrivateRoute
        path="/e"
        authenticated={authenticated}
        component={Dashboard}
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
  );
}

export default App;
