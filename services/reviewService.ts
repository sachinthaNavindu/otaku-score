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

export interface TopRatedAnime {
  animeId: number;
  animeTitle: string;
  averageRating: number;
  reviewCount: number;
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

export const getTopRatedAnimeFromReviews = async (
  limitCount = 10
): Promise<TopRatedAnime[]> => {
  const q = query(collection(db, "reviews"));
  const snapshot = await getDocs(q);

  const animeMap: Record<
    number,
    { title: string; total: number; count: number }
  > = {};

  snapshot.docs.forEach((docSnap) => {
    const data = docSnap.data();

    if (!data.animeId || !data.rating) return;

    if (!animeMap[data.animeId]) {
      animeMap[data.animeId] = {
        title: data.animeTitle,
        total: data.rating,
        count: 1,
      };
    } else {
      animeMap[data.animeId].total += data.rating;
      animeMap[data.animeId].count += 1;
    }
  });

  return Object.entries(animeMap)
    .map(([animeId, value]) => ({
      animeId: Number(animeId),
      animeTitle: value.title,
      averageRating: Number(
        (value.total / value.count).toFixed(1)
      ),
      reviewCount: value.count,
    }))
    .sort((a, b) => {
      if (b.averageRating === a.averageRating) {
        return b.reviewCount - a.reviewCount;
      }
      return b.averageRating - a.averageRating;
    })
    .slice(0, limitCount);
};