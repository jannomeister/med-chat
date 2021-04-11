import React, { useState } from "react";
import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom";
import { logout } from "../helpers/auth";

// components
import MainSidebar from "../components/MainSidebar/MainSidebar";
import CreateGroup from "../components/CreateGroup";
import Groups from "../components/Groups/Groups";
import Messages from "../components/Messages/Messages";
import { ConfirmLogoutModal } from "../components/Modals";

const Dashboard = () => {
  const { path } = useRouteMatch();
  const [openLogoutModal, setOpenLogoutModal] = useState(false);

  const onLogout = async () => {
    await logout();
  };

  return (
    <>
      <ConfirmLogoutModal
        open={openLogoutModal}
        onLogout={onLogout}
        onCancel={() => setOpenLogoutModal(false)}
      />
      <MainSidebar onLogout={() => setOpenLogoutModal(true)} />
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
