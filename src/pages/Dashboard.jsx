import React from "react";
import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom";
import { logout } from "../helpers/auth";

// components
import MainSidebar from "../components/MainSidebar/MainSidebar";
import CreateGroup from "../components/CreateGroup";
import Groups from "../components/Groups";
import Messages from "../components/Messages";

const Dashboard = () => {
  const { path } = useRouteMatch();

  const onLogout = async () => {
    await logout();
  };

  return (
    <>
      <MainSidebar onLogout={onLogout} />
      <main className="ml-16">
        <Switch>
          <Route path={`${path}/new/group`}>
            <CreateGroup />
          </Route>
          <Route path={`${path}/groups`}>
            <Groups />
          </Route>
          <Route path={`${path}/messages`}>
            <Messages />
          </Route>
          <Redirect to={`${path}/groups`} />
        </Switch>
      </main>
    </>
  );
};

export default Dashboard;
