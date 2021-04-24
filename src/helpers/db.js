import { db, firestore, createServerTimestamp } from "../services/firebase";
import { currUser } from "./auth";

const TABLE_GROUPS = "groups";
const TABLE_ROLES = "roles";
const TABLE_MESSAGES = "messages";
const TABLE_BANNED = "banned";

const fetchGroup = async (groupId) => {
  try {
    const doc = await db.collection(TABLE_GROUPS).doc(groupId).get();

    if (!doc.exists) {
      return null;
    }

    return {
      ...doc.data(),
    };
  } catch (err) {
    return err;
  }
};

const fetchMemberInfos = async (memberIds) => {
  try {
    if (!memberIds.length) {
      return [];
    }

    const members = [];

    const snapshot = await db
      .collection("users")
      .where(firestore.FieldPath.documentId(), "in", memberIds)
      .get();

    snapshot.forEach((doc) => {
      members.push({
        uid: doc.id,
        ...doc.data(),
      });
    });

    return members;
  } catch (err) {
    return err;
  }
};

const fetchMessageByGroupId = (groupId) => {
  return db
    .collection("messages")
    .doc(groupId)
    .collection("messages")
    .orderBy("sentAt");
};

const addGroup = async (data) => {
  try {
    const user = currUser();

    const group = {
      ...data,
      createdBy: user.uid,
      members: [user.uid],
      createdAt: createServerTimestamp(),
      updatedAt: createServerTimestamp(),
    };

    const { id: groupId } = await db.collection(TABLE_GROUPS).add(group);

    await db
      .collection(TABLE_ROLES)
      .doc(groupId)
      .set({
        admins: [user.uid],
      });

    return groupId;
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
        members: [...group.members, user.uid],
      });

    return true;
  } catch (err) {
    return err;
  }
};

const addMessage = async (currentGroupId, messageText, other) => {
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
      sentBy: user.uid,
      sentAt: createServerTimestamp(),
    };

    await db
      .collection(TABLE_MESSAGES)
      .doc(currentGroupId)
      .collection(TABLE_MESSAGES)
      .add(message);

    if (hasFile) {
      let newImages = 0;
      let newFiles = 0;

      for (let i = 0; i < fileUrls.length; i++) {
        // verify if its an image
        const isImage = fileUrls[i].contentType.startsWith("image/");

        if (isImage) {
          newImages += 1;
        } else {
          newFiles += 1;
        }
      }

      await db
        .collection(TABLE_GROUPS)
        .doc(currentGroupId)
        .update({
          totalImages: firestore.FieldValue.increment(newImages),
          totalFiles: firestore.FieldValue.increment(newFiles),
        });
    }

    return message;
  } catch (err) {
    return err;
  }
};

const addUser = async (uid, user) => {
  const userDoc = await db.collection("users").doc(user.uid).get();
  const exists = userDoc.exists;

  if (exists) {
    return true;
  }

  await db.collection("users").doc(uid).set(user);

  return true;
};

export {
  addUser,
  addGroup,
  addMessage,
  addMemberToGroup,
  removeMemberToGroup,
  fetchGroup,
  fetchMemberInfos,
  fetchMessageByGroupId,
};
