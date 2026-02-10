import {
  Text,
  View,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { TextInput } from "react-native";

const sampleAnime = {
  id: 1,
  title: "Attack on Titan",
  image: "https://picsum.photos/seed/aot/200/300",
  rating: 9.3,
};

const topReviews = [
  { id: 1, user: "Alice", rating: 5, text: "Amazing animation and story!" },
  { id: 2, user: "Bob", rating: 4, text: "Great characters but slow start." },
  { id: 3, user: "Charlie", rating: 5, text: "Epic ending!" },
  { id: 4, user: "Dave", rating: 4, text: "Loved the soundtrack." },
  { id: 5, user: "Eve", rating: 3, text: "Good but predictable plot." },
  { id: 6, user: "Frank", rating: 5, text: "Masterpiece." },
  { id: 7, user: "Grace", rating: 4, text: "Really enjoyed it." },
];

const userReview = { rating: 5, text: "My favorite anime ever!" };

const ReviewDetails = () => {
  const [showFullText, setShowFullText] = useState(false);
  const [userReview, setUserReview] = useState({
    rating: 5,
    text: "My favorite anime ever!",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(userReview.text);

  const renderReviewItem = ({ item }: any) => (
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
          {item.user}
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
      <Text style={{ color: "#9ca3af" }}>{item.text}</Text>
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
            source={{ uri: sampleAnime.image }}
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
              {sampleAnime.title}
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
                {sampleAnime.rating}
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

                <TouchableOpacity>
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
                  onPress={() => {
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
          data={topReviews}
          renderItem={renderReviewItem}
          keyExtractor={(item) => item.id.toString()}
          scrollEnabled={false}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ReviewDetails;
