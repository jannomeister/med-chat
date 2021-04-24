import { useState, useEffect } from "react";
import { fetchGroup, fetchMemberInfos } from "../helpers/db";

export default function useGroup(groupId) {
  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchGroup(groupId);

        if (data) {
          const members = await fetchMemberInfos(data.members);

          setItem({
            ...data,
            members,
          });
        }

        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    }

    fetchData();
  }, [groupId]);

  return [item, loading, error];
}
