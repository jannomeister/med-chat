import React from "react";
import usePagination from "firestore-pagination-hook";
import { db } from "../../services/firebase";
import { addMemberToGroup, removeMemberToGroup } from "../../helpers/db";

// components
import Masonry from "react-masonry-css";
import GroupItem from "./GroupItem";
import GroupsLoading from "./GroupsLoading";

const Groups = (props) => {
  const {
    loading,
    loadingError: error,
    loadingMore,
    loadingMoreError,
    hasMore,
    items,
    loadMore,
  } = usePagination(db.collection("groups").orderBy("createdAt", "desc"), {
    limit: 10,
  });

  const onJoinGroup = async (groupdId, group) => {
    await addMemberToGroup(groupdId, group);
  };

  const onLeaveGroup = async (groupId, group) => {
    await removeMemberToGroup(groupId, group);
  };

  if (loading) {
    return <GroupsLoading />;
  }

  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
      </div>
    );
  }

  if (!items.length) {
    return (
      <div>
        <h1>No data</h1>
      </div>
    );
  }

  return (
    <div className="px-2 py-4">
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
        {items.map((doc) => (
          <GroupItem
            key={doc.id}
            id={doc.id}
            item={doc.data()}
            onLeaveGroup={async (item) => await onLeaveGroup(doc.id, item)}
            onJoinGroup={async (item) => await onJoinGroup(doc.id, item)}
          />
        ))}
      </Masonry>

      <div className="flex items-center justify-center w-full">
        {hasMore && !loadingMore ? (
          <button
            className="bg-indigo-500 text-white rounded px-3 py-2 font-semibold"
            onClick={loadMore}
          >
            Load more
          </button>
        ) : loadingMore ? (
          <p>Loading...</p>
        ) : loadingMoreError ? (
          <p>All done!</p>
        ) : null}
      </div>
    </div>
  );
};

export default Groups;
