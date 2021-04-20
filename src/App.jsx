import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { ImSpinner8 } from "react-icons/im";
import Modal from "react-modal";

// pages
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import { auth } from "./services/firebase";

// routes
import PublicRoute from "./routes/PublicRoute";
import PrivateRoute from "./routes/PrivateRoute";

import "./App.css";

Modal.setAppElement("#root");

function App() {
  const [user, loading, error] = useAuthState(auth());

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center text-4xl">
        <span className="mr-2">Loading...</span>
        <ImSpinner8 className="animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen w-full flex items-center justify-center text-4xl">
        <span>Something went wrong...</span>
      </div>
    );
  }

  const authenticated = user ? true : false;

  return (
    <Switch>
      <Route exact path="/">
        {authenticated ? <Redirect to="/e" /> : <Redirect to="/login" />}
      </Route>
      <PublicRoute
        path="/login"
        authenticated={authenticated}
        component={Login}
      />
      <PrivateRoute
        path="/e"
        authenticated={authenticated}
        component={Dashboard}
      />
    </Switch>
  );
}

export default App;
