import React from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../services/firebase";
import { addMemberToGroup, removeMemberToGroup } from "../helpers/db";

// components
import Masonry from "react-masonry-css";
import GroupItem from "./GroupItem";

const Groups = (props) => {
  const [value, loading, error] = useCollection(db.collection("groups"), {
    snapshotListenOptions: {
      includeMetadataChanges: true,
    },
  });

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

  return (
    <div className="px-2 py-4">
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
