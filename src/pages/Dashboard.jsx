import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";

// components
import MainSidebar from "../components/MainSidebar/MainSidebar";
import Groups from "../pages/Groups";
import Messages from "../pages/Messages";

const Dashboard = () => {
  const { path } = useRouteMatch();

  return (
    <>
      <MainSidebar onLogout={() => console.log("logout!")} />
      <main className="ml-16">
        <Switch>
          <Route path={`${path}/groups`}>
            <Groups />
          </Route>
          <Route path={`${path}/messages`}>
            <Messages />
          </Route>
        </Switch>
      </main>
    </>
  );
};

export default Dashboard;
