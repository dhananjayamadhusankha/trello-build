import { ID, storage } from "@/appwrite";

const imageUpload = async (file: File) => {
  if (!file) return;

  const bucketId = process.env.BUCKET_ID;

  if (!bucketId) {
    console.log("No set bucketId")
  }

  const fileUploaded = await storage.createFile(bucketId!, ID.unique(), file);

  return fileUploaded
};

export default imageUpload;
