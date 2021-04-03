import React from "react";
import { useHistory } from "react-router-dom";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../services/firebase";
import { logout } from "../helpers/auth";
import { addGroup, addMemberToGroup, removeMemberToGroup } from "../helpers/db";

// components
import Sidebar from "../components/Sidebar";
import GroupItem from "../components/GroupItem";

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
    <>
      <div>
        <button
          type="button"
          className="bg-red-500 m-1.5 p-1.5"
          onClick={onCreateGroup}
        >
          Create a Group chat
        </button>
      </div>

      {loading === false ? (
        <div className="masonry max-w-7xl px-16 py-8">
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
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <button type="button" onClick={onLogout}>
        Logout
      </button>
    </>
  );
};

export default Groups;
