import { db, createServerTimestamp } from "../services/firebase";
import { currUser } from "./auth";

const fetchGroups = () => {
  return new Promise(async (resolve, reject) => {
    const groups = [];

    try {
      const snapshot = await db.collection("group").get();

      snapshot.forEach((doc) => {
        groups.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      return resolve(groups);
    } catch (err) {
      return reject(err);
    }
  });
};

const fetchGroup = (groupId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const doc = await db.collection("group").doc(groupId).get();

      return resolve(doc.exists ? doc.data() : null);
    } catch (err) {
      return reject(err);
    }
  });
};

const fetchMessageByGroupId = (groupId) => {
  return db
    .collection("message")
    .doc(groupId)
    .collection("messages")
    .orderBy("sentAt");
};

const addGroup = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const group = {
        ...data,
        members: [currUser().uid],
        createdBy: {
          userId: currUser().uid,
          displayName: currUser().displayName,
          email: currUser().email,
          photoUrl: currUser().photoURL,
        },
        createdAt: createServerTimestamp(),
        updatedAt: createServerTimestamp(),
      };

      const result = await db.collection("group").add(group);

      return resolve(result.id);
    } catch (err) {
      return reject(err);
    }
  });
};

const removeMemberToGroup = (groupId, group) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db
        .collection("group")
        .doc(groupId)
        .set({
          ...group,
          members: group.members.filter((m) => m !== currUser().uid),
        });

      return resolve(true);
    } catch (err) {
      return reject(err);
    }
  });
};

const addMemberToGroup = (groupId, group) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db
        .collection("group")
        .doc(groupId)
        .set({
          ...group,
          members: [...group.members, currUser().uid],
        });

      return resolve(true);
    } catch (err) {
      return reject(err);
    }
  });
};

const addMessage = (currentGroupId, messageText) => {
  return new Promise(async (resolve, reject) => {
    try {
      const message = {
        messageText: messageText.trim(),
        sentBy: currUser().uid,
        sentAt: createServerTimestamp(),
      };

      await db
        .collection("message")
        .doc(currentGroupId)
        .collection("messages")
        .add(message);

      return resolve(message);
    } catch (err) {
      return reject(err);
    }
  });
};

export {
  addGroup,
  addMessage,
  addMemberToGroup,
  removeMemberToGroup,
  fetchGroups,
  fetchGroup,
  fetchMessageByGroupId,
};
