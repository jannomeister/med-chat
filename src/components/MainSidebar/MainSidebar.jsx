import React from "react";
import { useRouteMatch, useHistory } from "react-router-dom";

// components
import HomeIcon from "./HomeIcon";
import MessageIcon from "./MessageIcon";
import SettingsIcon from "./SettingsIcon";
import NotificationIcon from "./NotificationIcon";
import LogoutIcon from "./LogoutIcon";

const MainSidebar = ({ onLogout }) => {
  const { url } = useRouteMatch();
  const history = useHistory();

  return (
    <aside className="fixed h-screen bg-gray-800 w-16">
      <nav className="flex flex-col h-full">
        <div className="px-4 py-2 mb-6 text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-full"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"
            />
          </svg>
        </div>

        <div className="px-2">
          <HomeIcon onClick={() => history.push(`${url}/groups`)} />

          <MessageIcon onClick={() => history.push(`${url}/messages`)} />

          <SettingsIcon />

          <NotificationIcon />
        </div>

        <hr className="border-gray-700" />

        <LogoutIcon onClick={onLogout} />
      </nav>
    </aside>
  );
};

export default MainSidebar;
