import React from "react";
import { useRouteMatch, useLocation } from "react-router-dom";
import { useCollectionOnce } from "react-firebase-hooks/firestore";
import { currUser } from "../../../helpers/auth";
import { db } from "../../../services/firebase";

// components
import Searchbar from "./Searchbar";
import MessageCounter from "./MessageCounter";
import Item from "./Item";

const GroupChatSidebar = () => {
  const { url, path } = useRouteMatch();
  const { pathname } = useLocation();
  const user = currUser();
  const [snapshot, loading, error] = useCollectionOnce(
    db.collection("groups").where("members", "array-contains", {
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
    })
  );

  return (
    <aside
      className="h-screen w-80 z-10 top-0 left-0 overflow-x-hidden no-scrollbar"
      style={{ scrollBehavior: "smooth" }}
    >
      <nav className="h-full border-r">
        <h1 className="text-xl font-bold px-4 py-3">Messages</h1>

        <Searchbar />

        <MessageCounter />

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error...</p>
        ) : (
          <>
            {snapshot.docs.map((group) => (
              <Item
                key={group.id}
                to={`${url}/t/${group.id}`}
                group={group.data()}
                isActive={pathname === `${path}/t/${group.id}`}
              />
            ))}
          </>
        )}
      </nav>
    </aside>
  );
};

export default GroupChatSidebar;
