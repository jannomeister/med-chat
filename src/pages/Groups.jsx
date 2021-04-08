import React from "react";
import { useHistory } from "react-router-dom";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../services/firebase";
import { logout } from "../helpers/auth";
import { addGroup, addMemberToGroup, removeMemberToGroup } from "../helpers/db";

// components
import Masonry from "react-masonry-css";
import MainSidebar from "../components/MainSidebar/MainSidebar";
import Sidebar from "../components/Sidebar";
import GroupItem from "../components/GroupItem";

let brakePoints = [350, 500, 750];

const Groups = (props) => {
  const history = useHistory();

  const [value, loading, error] = useCollection(db.collection("group"), {
    snapshotListenOptions: {
      includeMetadataChanges: true,
    },
  });

  const onCreateGroup = async () => {
    history.push("/new/group");
  };

  const onJoinGroup = async (groupdId, group) => {
    try {
      await addMemberToGroup(groupdId, group);
    } catch (err) {
      console.log("errrr: ", err);
    }
  };

  const onLeaveGroup = async (groupId, group) => {
    try {
      await removeMemberToGroup(groupId, group);
    } catch (err) {
      console.log("errrr: ", err);
    }
  };

  const onLogout = async () => {
    await logout();
  };

  return (
    <div className="p-2">
      {!loading ? (
        <Masonry
          breakpointCols={{
            default: 4,
            1100: 3,
            700: 2,
            500: 1,
          }}
          className="flex -ml-7 w-auto"
          columnClassName="pl-7 bg-clip-padding"
        >
          {value.docs.length > 0 ? (
            value.docs.map((doc) => (
              <GroupItem
                key={doc.id}
                id={doc.id}
                item={doc.data()}
                onLeaveGroup={async (item) => await onLeaveGroup(doc.id, item)}
                onJoinGroup={async (item) => await onJoinGroup(doc.id, item)}
              />
            ))
          ) : (
            <h1>No data</h1>
          )}
        </Masonry>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Groups;
