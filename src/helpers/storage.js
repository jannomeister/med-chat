import { storage } from "../services/firebase";

const fetchGroupPhotos = async (groupId) => {
  const { items } = await storage.ref(`group/${groupId}/images`).listAll();
  const only6 = items.slice(-6).reverse();
  const photos = [];

  for await (const item of only6) {
    const url = await item.getDownloadURL();

    photos.push(url);
  }

  return photos;
};

export { fetchGroupPhotos };
