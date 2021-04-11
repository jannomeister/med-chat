import React from "react";
import { Route, Switch } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

// pages
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import { auth } from "./services/firebase";

// routes
import PublicRoute from "./routes/PublicRoute";
import PrivateRoute from "./routes/PrivateRoute";

import "./App.css";

function App() {
  const [user, loading, error] = useAuthState(auth());

  if (loading) {
    return (
      <div>
        <span>Loading...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
      </div>
    );
  }

  const authenticated = user ? true : false;

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
    </Switch>
  );
}

export default App;
