import { db, firestore, createServerTimestamp } from "../services/firebase";
import { currUser } from "./auth";

const TABLE_GROUPS = "groups";

const fetchGroups = async () => {
  const groups = [];

  try {
    const snapshot = await db.collection(TABLE_GROUPS).get();

    snapshot.forEach((doc) => {
      groups.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    return groups;
  } catch (err) {
    return err;
  }
};

const fetchGroup = async (groupId) => {
  try {
    const doc = await db.collection(TABLE_GROUPS).doc(groupId).get();

    return doc.exists ? doc.data() : null;
  } catch (err) {
    return err;
  }
};

const fetchMessageByGroupId = (groupId) => {
  return db
    .collection("message")
    .doc(groupId)
    .collection("messages")
    .orderBy("sentAt");
};

const fetchCurrUserGroups = async () => {
  const user = currUser();
  const querySnapshot = await db
    .collectionGroup(TABLE_GROUPS)
    .where("members", "array-contains", {
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
    })
    .get();

  const groups = [];
  querySnapshot.forEach((doc) => {
    groups.push({
      id: doc.id,
      ...doc.data(),
    });
  });

  return groups;
};

const addGroup = async (data) => {
  const user = currUser();

  try {
    const group = {
      ...data,
      members: [
        {
          uid: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL,
          email: user.email,
        },
      ],
      createdBy: {
        userId: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoUrl: user.photoURL,
      },
      createdAt: createServerTimestamp(),
      updatedAt: createServerTimestamp(),
    };

    const result = await db.collection(TABLE_GROUPS).add(group);

    return result.id;
  } catch (err) {
    return err;
  }
};

const removeMemberToGroup = async (groupId, group) => {
  const user = currUser();
  try {
    await db
      .collection(TABLE_GROUPS)
      .doc(groupId)
      .set({
        ...group,
        members: group.members.filter((m) => m.uid !== user.uid),
      });

    return true;
  } catch (err) {
    return err;
  }
};

const addMemberToGroup = async (groupId, group) => {
  const user = currUser();
  try {
    await db
      .collection("groups")
      .doc(groupId)
      .set({
        ...group,
        members: [
          ...group.members,
          {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
            email: user.email,
          },
        ],
      });

    return true;
  } catch (err) {
    return err;
  }
};

const addMessage = async (currentGroupId, messageText, other) => {
  console.log({ messageText, other });
  const user = currUser();
  const gifUrl = other && other.gifUrl ? other.gifUrl : "";
  const fileUrls = other && other.fileUrls ? other.fileUrls : "";
  const hasFile = fileUrls.length > 0 ? true : false;
  const hasGif = gifUrl ? true : false;

  try {
    const message = {
      messageText: messageText.trim(),
      gif: gifUrl,
      files: [...fileUrls],
      hasGif,
      hasFile,
      sentBy: {
        uid: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL,
        email: user.email,
      },
      sentAt: createServerTimestamp(),
    };

    await db
      .collection("message")
      .doc(currentGroupId)
      .collection("messages")
      .add(message);

    if (hasFile) {
      await db
        .collection(TABLE_GROUPS)
        .doc(currentGroupId)
        .update({
          totalImages: firestore.FieldValue.increment(fileUrls.length),
        });
    }

    return message;
  } catch (err) {
    return err;
  }
};

export {
  addGroup,
  addMessage,
  addMemberToGroup,
  removeMemberToGroup,
  fetchGroups,
  fetchGroup,
  fetchMessageByGroupId,
  fetchCurrUserGroups,
};
