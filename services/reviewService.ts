import {
  addDoc,
  collection,
  serverTimestamp,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  orderBy,
} from "firebase/firestore";import { db } from "@/services/firebase";

export interface Review {
  id: string;
  animeId: string;
  animeTitle: string;
  userId: string;
  username?: string;
  rating: number;
  content: string;
  createdAt: any;
}
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
    content:reviewText,
    createdAt: serverTimestamp(),
  });
};

export const getUserReviews = async (userId: string): Promise<Review[]> => {
  const q = query(
    collection(db, "reviews"),
    where("userId", "==", userId),
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((docSnap) => {
    const data = docSnap.data();
    return {
      id: docSnap.id,
      animeId: data.animeId,
      animeTitle: data.animeTitle,
      userId: data.userId,
      username: data.username,
      rating: data.rating,
      content: data.content,
      createdAt: data.createdAt,
    };
  });
};

export const deleteReviewById = async (reviewId: string) => {
  await deleteDoc(doc(db, "reviews", reviewId));
};  
