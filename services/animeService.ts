import { db } from "@/services/firebase";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { Anime } from "./animeApiService"; 



const uploadAnimeImage = async (uri: string) => {
  try {
    const formData = new FormData();
    const filename = uri.split("/").pop() || "anime.jpg";
    const fileType = filename.split(".").pop() || "jpg";

    formData.append("file", {
      uri,
      name: filename,
      type: `image/${fileType}`,
    } as any);

    formData.append("upload_preset", "anime_upload");

    const cloudinaryUrl = `https://api.cloudinary.com/v1_1/dgluvcp9o/image/upload`;

    const response = await fetch(cloudinaryUrl, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (!data.secure_url) {
      throw new Error("Cloudinary upload failed");
    }

    return data.secure_url;
  } catch (error) {
    console.error("Anime image upload failed:", error);
    return uri; 
  }
};


export const saveAnimeNamesToFirestore = async (animeList: Anime[]) => {
  try {
    const animeCollection = collection(db, "animeNames");

    for (const anime of animeList) {
      const q = query(animeCollection, where("mal_id", "==", anime.mal_id));
      const snapshot = await getDocs(q);
      if (!snapshot.empty) continue; 
      const cloudUrl = await uploadAnimeImage(anime.image);

      await addDoc(animeCollection, {
        mal_id: anime.mal_id,
        name: anime.title,
        imageUrl: cloudUrl,
        createdAt: new Date(),
      });
    }

    console.log("Anime names saved successfully!");
  } catch (error) {
    console.error("Error saving anime names:", error);
  }
};
