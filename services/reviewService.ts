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
  imageUrl?: string;
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
  const reviewSnap = await getDocs(collection(db, "reviews"));

  const animeMap: Record<
    number,
    { title: string; total: number; count: number }
  > = {};

  reviewSnap.docs.forEach((doc) => {
    const data = doc.data();
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

  const topAnime = Object.entries(animeMap)
    .map(([animeId, value]) => ({
      animeId: Number(animeId),
      animeTitle: value.title,
      averageRating: Number((value.total / value.count).toFixed(1)),
      reviewCount: value.count,
    }))
    .sort((a, b) => {
      if (b.averageRating === a.averageRating) {
        return b.reviewCount - a.reviewCount;
      }
      return b.averageRating - a.averageRating;
    })
    .slice(0, limitCount);

  const animeIds = topAnime.map((a) => a.animeId);

  if (animeIds.length === 0) return [];

  const animeQuery = query(
    collection(db, "animeNames"),
    where("mal_id", "in", animeIds)
  );

  const animeSnap = await getDocs(animeQuery);

  const imageMap: Record<number, string> = {};
  animeSnap.docs.forEach((doc) => {
    const data = doc.data();
    imageMap[data.mal_id] = data.imageUrl;
  });

  return topAnime.map((anime) => ({
    ...anime,
    imageUrl: imageMap[anime.animeId],
  }));
};
