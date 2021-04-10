import React, { useState, useEffect } from "react";
import { Switch, Route, Link, useRouteMatch } from "react-router-dom";
import { fetchCurrUserGroups } from "../../helpers/db";

// components
import GroupChatLeftSidebar from "./GroupChatLeftSidebar/GroupChatLeftSidebar";
import MessageView from "./MessageView";

const Messages = () => {
  const { path } = useRouteMatch();
  const [groups, setGroups] = useState([]);
  // const [selectedGroup, setSelectedGroup] = useState(null);

  useEffect(() => {
    fetchCurrUserGroups().then((result) => {
      setGroups(result);
    });
  }, []);

  return (
    <div className="flex items-center justify-start my-0">
      <GroupChatLeftSidebar
        groups={groups}
        // onSelect={(group) => setSelectedGroup(group)}
      />
      <Switch>
        <Route path={`${path}/t/:id`}>
          <MessageView />
        </Route>
      </Switch>
    </div>
  );
};

export default Messages;
