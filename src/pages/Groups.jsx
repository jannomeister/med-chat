import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../services/firebase";
import { currUser, logout } from "../helpers/auth";
import { addGroup, addMemberToGroup } from "../helpers/db";

const Groups = (props) => {
  const history = useHistory();

  const [value, loading, error] = useCollection(db.collection("group"), {
    snapshotListenOptions: {
      includeMetadataChanges: true,
    },
  });

  const onCreateGroup = async () => {
    await addGroup({
      name: "Photo title",
      description:
        "aksdhadkjasjhdkahkjdshakdakjdhkjjhgjgjhgjhghjghjghjhjjgjgjhjjghgjjgjhgjhgjhghjghjgjhgjhgjhgjhgjhgjjhdkjhskjdhkjashdkjadhkdkjahdkjahjdkhadkjhaskhdkashdkjahdhaksdhkjdsh",
      avatar:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=500&q=80 500w, https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80 800w, https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1000&q=80 1000w, https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1100&q=80 1100w, https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1400&q=80 1400w, https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1600&q=80 1600w, https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1700&q=80 1700w, https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=2000&q=80 2000w, https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=2200&q=80 2200w, https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=2300&q=80 2300w, https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=2600&q=80 2600w, https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=2800&q=80 2800w, https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=2900&q=80 2900w, https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=3200&q=80 3200w, https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=3400&q=80 3400w, https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=3500&q=80 3500w, https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=3648&q=80 3648w",
      banner:
        "https://images.unsplash.com/photo-1444464666168-49d633b86797?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
    });
  };

  const onJoinGroup = async (groupdId, group) => {
    try {
      await addMemberToGroup(groupdId, group);
    } catch (err) {
      console.log("errrr: ", err);
    }
  };

  const onViewGroup = (groupId) => {
    history.push(`/groups/${groupId}`);
  };

  const onLogout = async () => {
    await logout();
  };

  return (
    <div>
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
          {value.docs.map((doc) => {
            const item = doc.data();

            return (
              <div
                className="rounded-lg overflow-hidden mb-8 border border-gray-400"
                key={doc.id}
              >
                <img src={item.banner} className="object-cover h-32 w-full" />

                <div className="p-1.5">
                  <img
                    src={item.avatar}
                    className="w-16 h-16 border rounded-full"
                  />

                  <h2>{item.name}</h2>
                  <p className="break-words">{item.description}</p>

                  <div>
                    <span>{item.members.length} members</span>
                  </div>

                  {item.createdBy !== currUser().uid &&
                  !item.members.includes(currUser().uid) ? (
                    <button
                      type="button"
                      className="bg-red-500 border rounded-full px-6 py-1.5 text-white"
                      onClick={async () => await onJoinGroup(doc.id, item)}
                    >
                      Join the Group Chat
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="bg-indigo-500 border rounded-full px-6 py-1.5 text-white"
                      onClick={() => onViewGroup(doc.id)}
                    >
                      View
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <button type="button" onClick={onLogout}>
        Logout
      </button>
    </div>
  );
};

export default Groups;
