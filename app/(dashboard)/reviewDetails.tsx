import {
  Text,
  View,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { TextInput } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { getReviewsByAnimeId, Review,getUserReviewByAnimeId, deleteReviewById,updateReviewById} from "@/services/reviewService";
import { getAuth } from "firebase/auth";


const ReviewDetails = () => {
  const [showFullText, setShowFullText] = useState(false);
  const [userReview, setUserReview] = useState<{rating:number; text:string} | null>({
    rating: 5,
    text: "My favorite anime ever!",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(userReview?.text || "");
  const { animeId, title, image, rating } = useLocalSearchParams();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [averageRating, setAverageRating] = useState(0);
  const [userReviewId, setUserReviewId] = useState<string | null>(null)


  useEffect(() => {
    const fetchReviews = async () => {
      if (!animeId) return;

      const result = await getReviewsByAnimeId(Number(animeId));

      setReviews(result.reviews);
      setAverageRating(result.averageRating);
    };

    fetchReviews();
  }, [animeId]);

  useEffect(() => {
  const fetchUserReview = async () => {
    if (!animeId) return;

    const auth = getAuth();
    const userId = auth.currentUser?.uid;
    if (!userId) return;

    const review = await getUserReviewByAnimeId(Number(animeId), userId);
    if (review) {
      setUserReview({ rating: review.rating, text: review.content });
      setEditedText(review.content);
      setUserReviewId(review.id)
    }
  };

  fetchUserReview();
}, [animeId]);

  const renderReviewItem = ({ item }: { item: Review }) => (
    <View
      style={{
        backgroundColor: "#1a1a1a",
        padding: 12,
        borderRadius: 12,
        marginBottom: 12,
      }}
    >
      <View
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 6 }}
      >
        <Text style={{ color: "#ffffff", fontWeight: "bold", marginRight: 8 }}>
          {item.username || "Anonymous"}
        </Text>

        <View style={{ flexDirection: "row" }}>
          {[1, 2, 3, 4, 5].map((star) => (
            <Ionicons
              key={star}
              name={star <= item.rating ? "star" : "star-outline"}
              size={16}
              color="#dc2626"
            />
          ))}
        </View>
      </View>

      <Text style={{ color: "#9ca3af" }}>{item.content}</Text>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#000000" }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 16,
          paddingVertical: 12,
          borderBottomWidth: 1,
          borderBottomColor: "#222222",
        }}
      >
        <TouchableOpacity onPress={() => router.back()} style={{ padding: 8 }}>
          <Ionicons name="arrow-back" size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text
          style={{
            color: "#ffffff",
            fontSize: 18,
            fontWeight: "bold",
            marginLeft: 12,
          }}
        >
          Review Details
        </Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 24 }}>
        <View style={{ flexDirection: "row", marginBottom: 16 }}>
          <Image
            source={{ uri: image as string }}
            style={{
              width: 100,
              height: 150,
              borderRadius: 12,
              marginRight: 16,
            }}
          />
          <View style={{ flex: 1, justifyContent: "space-between" }}>
            <Text
              style={{ color: "#ffffff", fontSize: 20, fontWeight: "bold" }}
            >
              {title}
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 8,
              }}
            >
              <Ionicons name="star" size={20} color="#dc2626" />
              <Text style={{ color: "#ffffff", marginLeft: 6, fontSize: 16 }}>
                {rating}
              </Text>
            </View>
            <Text style={{ color: "#9ca3af", marginTop: 12 }}>
              {showFullText
                ? "This anime is widely regarded as one of the best. Incredible animation, deep storyline, and unforgettable characters. Highly recommended to all anime fans. This text can continue more for demonstration..."
                : "This anime is widely regarded as one of the best..."}
            </Text>
            <TouchableOpacity onPress={() => setShowFullText(!showFullText)}>
              <Text style={{ color: "#dc2626", marginTop: 4 }}>
                {showFullText ? "Show Less" : "Read More"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {userReview && (
          <View
            style={{
              backgroundColor: "#262626",
              padding: 16,
              borderRadius: 12,
              marginBottom: 24,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 8,
              }}
            >
              <Text style={{ color: "#ffffff", fontWeight: "bold" }}>
                Your Review
              </Text>

              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  style={{ marginRight: 12 }}
                  onPress={() => {
                    setEditedText(userReview.text);
                    setIsEditing(true);
                  }}
                >
                  <Ionicons name="create-outline" size={20} color="#22c55e" />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={async ()=>{
                    if(!userReviewId)return

                    await deleteReviewById(userReviewId)
                    setUserReview(null)
                    setEditedText("")
                    setReviews(reviews.filter(r => r.id !== userReviewId))
                  }}
                >
                  <Ionicons name="trash-outline" size={20} color="#ef4444" />
                </TouchableOpacity>
              </View>
            </View>

            <View style={{ flexDirection: "row", marginBottom: 8 }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <Ionicons
                  key={star}
                  name={star <= userReview.rating ? "star" : "star-outline"}
                  size={16}
                  color="#dc2626"
                />
              ))}
            </View>

            {isEditing ? (
              <TextInput
                value={editedText}
                onChangeText={setEditedText}
                multiline
                style={{
                  color: "#ffffff",
                  borderWidth: 1,
                  borderColor: "#404040",
                  borderRadius: 8,
                  padding: 10,
                  minHeight: 80,
                  textAlignVertical: "top",
                }}
                placeholder="Edit your review..."
                placeholderTextColor="#6b7280"
              />
            ) : (
              <Text style={{ color: "#9ca3af" }}>{userReview.text}</Text>
            )}

            {isEditing && (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  marginTop: 12,
                }}
              >
                <TouchableOpacity
                  onPress={() => setIsEditing(false)}
                  style={{ marginRight: 16 }}
                >
                  <Text style={{ color: "#9ca3af" }}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={async() => {
                    if (!userReviewId || !userReview) return;

                    await updateReviewById(userReviewId, editedText, userReview.rating);
                    setUserReview({ ...userReview, text: editedText });
                    setIsEditing(false);
                  }}
                >
                  <Text style={{ color: "#22c55e", fontWeight: "bold" }}>
                    Save
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}

        <Text
          style={{
            color: "#ffffff",
            fontSize: 18,
            fontWeight: "bold",
            marginBottom: 12,
          }}
        >
          Top Reviews
        </Text>
        <FlatList
          data={reviews}
          renderItem={renderReviewItem}
          keyExtractor={(item) => item.id.toString()}
          scrollEnabled={false}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ReviewDetails;
