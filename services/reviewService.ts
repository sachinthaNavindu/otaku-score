import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/services/firebase";

export const publishReview = async ({
  animeId,
  animeTitle,
  userId,
  username,
  rating,
  reviewText,
}: {
  animeId: number;
  animeTitle: string;
  userId: string;
  username: string;
  rating: number;
  reviewText: string;
}) => {
  await addDoc(collection(db, "reviews"), {
    animeId,
    animeTitle,
    userId,
    username,
    rating,
    reviewText,
    createdAt: serverTimestamp(),
  });
};
