import React from "react";
import { useRouteMatch, useLocation } from "react-router-dom";

// components
import Searchbar from "./Searchbar";
import MessageCounter from "./MessageCounter";
import Item from "./Item";

const GroupChatSidebar = ({ groups }) => {
  const { url, path } = useRouteMatch();
  const { pathname } = useLocation();

  return (
    <aside
      className="h-screen w-80 z-10 top-0 left-0 overflow-x-hidden no-scrollbar"
      style={{ scrollBehavior: "smooth" }}
    >
      <nav className="h-full border-r">
        <h1 className="text-xl font-bold px-4 py-3">Messages</h1>

        <Searchbar />

        <MessageCounter />

        {groups.map((group) => (
          <Item
            key={group.id}
            to={`${url}/t/${group.id}`}
            group={group}
            isActive={pathname === `${path}/t/${group.id}`}
          />
        ))}
      </nav>
    </aside>
  );
};

export default GroupChatSidebar;
