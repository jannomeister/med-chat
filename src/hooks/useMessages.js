import { useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../services/firebase";

export default function useMessages(groupId) {
  const [messages, setMessages] = useState([]);

  const [value, loading] = useCollection(
    db
      .collection("messages")
      .doc(groupId)
      .collection("messages")
      .orderBy("sentAt", "desc"),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  useEffect(() => {
    if (value && value.docs) {
      setMessages(value.docs);
    }
  }, [value]);

  return [messages, loading];
}
