import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";

// components
import GroupChatLeftSidebar from "./GroupChatLeftSidebar/GroupChatLeftSidebar";
import MessageView from "./MessageView";

const Messages = () => {
  const { path } = useRouteMatch();

  return (
    <div className="flex items-center justify-start my-0">
      <GroupChatLeftSidebar />
      <Switch>
        <Route path={`${path}/t/:id`}>
          <MessageView />
        </Route>
      </Switch>
    </div>
  );
};

export default Messages;
