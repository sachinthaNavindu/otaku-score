import { doc, getDoc, updateDoc, setDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db } from "./firebase";

export const getUserData = async (uid: string) => {
  const userRef = doc(db, "users", uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    throw new Error("User not found");
  }

  return userSnap.data();
};

export const updateUserData = async (
  uid: string,
  data: { username?: string; email?: string; profileImage?: string },
) => {
  const userRef = doc(db, "users", uid);
  await updateDoc(userRef, data);
};

export const uploadProfileImage = async (uri: string, uid: string) => {
  try {
    const formData = new FormData();
    const filename = uri.split("/").pop() || `${uid}.jpg`;
    const fileType = filename.split(".").pop() || "jpg";

    formData.append("file", {
      uri,
      name: filename,
      type: `image/${fileType}`,
    } as any);

    formData.append("upload_preset", "profile_upload");

    const cloudinaryUrl = `https://api.cloudinary.com/v1_1/dgluvcp9o/image/upload`;

    const response = await fetch(cloudinaryUrl, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (!data.secure_url) {
      throw new Error("Cloudinary upload failed");
    }

    await updateUserData(uid, { profileImage: data.secure_url });

    return data.secure_url;
  } catch (error) {
    console.error("Image upload failed:", error);
    throw new Error("Failed to upload image");
  }
};

