import {
  Text,
  View,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Alert,
  Modal,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { getAuth } from "firebase/auth";
import { useUser } from "@/context/UserContext";
import { publishReview } from "@/services/reviewService";

const animeList = [
  { id: 1, title: "Attack on Titan" },
  { id: 2, title: "Demon Slayer: Kimetsu no Yaiba" },
  { id: 3, title: "Jujutsu Kaisen" },
  { id: 4, title: "One Piece" },
  { id: 5, title: "Naruto: Shippuden" },
  { id: 6, title: "Fullmetal Alchemist: Brotherhood" },
  { id: 7, title: "Hunter x Hunter" },
  { id: 8, title: "Steins;Gate" },
  { id: 9, title: "Death Note" },
  { id: 10, title: "My Hero Academia" },
];

const Reviews = () => {
  const [selectedAnime, setSelectedAnime] = useState<{
    id: number;
    title: string;
  } | null>(null);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const auth = getAuth();
  const { username } = useUser();

  const filteredAnime = animeList.filter((anime) =>
    anime.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

const handlePublish = async () => {
  if (!selectedAnime) {
    Alert.alert("Error", "Please select an anime");
    return;
  }

  if (rating === 0) {
    Alert.alert("Error", "Please rate the anime");
    return;
  }

  if (reviewText.trim().length < 10) {
    Alert.alert("Error", "Review must be at least 10 characters long");
    return;
  }

  try {
    setIsSubmitting(true);

    const user = auth.currentUser;
    if (!user) {
      Alert.alert("Error", "You must be logged in");
      return;
    }

    await publishReview({
      animeId: selectedAnime.id,
      animeTitle: selectedAnime.title,
      userId: user.uid,
      username: username || "Anonymous",
      rating,
      reviewText: reviewText.trim(),
    });

    Alert.alert("Success", "Review published 🎉");

    setSelectedAnime(null);
    setRating(0);
    setReviewText("");
    setSearchQuery("");
  } catch (error) {
    console.error(error);
    Alert.alert("Error", "Failed to publish review");
  } finally {
    setIsSubmitting(false);
  }
};


  const StarRating = () => (
    <View style={{ flexDirection: "row", marginVertical: 16 }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <TouchableOpacity
          key={star}
          onPress={() => setRating(star)}
          style={{ marginRight: 8 }}
          activeOpacity={0.7}
        >
          <Ionicons
            name={star <= rating ? "star" : "star-outline"}
            size={36}
            color={star <= rating ? "#dc2626" : "#666666"}
          />
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderAnimeItem = ({
    item,
  }: {
    item: { id: number; title: string };
  }) => (
    <TouchableOpacity
      style={{
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#374151",
      }}
      onPress={() => {
        setSelectedAnime(item);
        setShowDropdown(false);
        setSearchQuery("");
      }}
    >
      <Text style={{ color: "#ffffff", fontSize: 16 }}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaProvider>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
      >
        <View style={{ flex: 1, backgroundColor: "#000000" }}>
          <StatusBar barStyle="light-content" backgroundColor="#000000" />

          <LinearGradient colors={["#000000", "#1a0000"]} style={{ flex: 1 }}>
            <SafeAreaView edges={["top"]} style={{ flex: 1 }}>
              <ScrollView
                style={{ flex: 1 }}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 40 }}
                keyboardShouldPersistTaps="handled"
              >
                <View
                  style={{
                    paddingHorizontal: 24,
                    paddingTop: 24,
                    marginBottom: 32,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        if (router.canGoBack()) {
                          router.back();
                        } else {
                          router.replace("/(dashboard)");
                        }
                      }}
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        backgroundColor: "rgba(26, 26, 26, 0.8)",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Ionicons name="arrow-back" size={24} color="#ffffff" />
                    </TouchableOpacity>

                    <Text
                      style={{
                        color: "#ffffff",
                        fontSize: 20,
                        fontWeight: "bold",
                      }}
                    >
                      Write a Review
                    </Text>

                    <View style={{ width: 40 }} />
                  </View>
                </View>

                <View
                  style={{
                    backgroundColor: "rgba(26, 26, 26, 0.8)",
                    marginHorizontal: 24,
                    borderRadius: 16,
                    padding: 24,
                    marginBottom: 32,
                  }}
                >
                  <Text
                    style={{
                      color: "#ffffff",
                      fontSize: 20,
                      fontWeight: "bold",
                      marginBottom: 24,
                    }}
                  >
                    ✍️ Share Your Thoughts
                  </Text>

                  <View style={{ marginBottom: 24 }}>
                    <Text
                      style={{
                        color: "#9ca3af",
                        fontSize: 14,
                        marginBottom: 8,
                      }}
                    >
                      Select Anime
                    </Text>

                    <TouchableOpacity
                      style={{
                        backgroundColor: "#1a1a1a",
                        borderRadius: 12,
                        paddingHorizontal: 16,
                        paddingVertical: 16,
                        borderWidth: 1,
                        borderColor: selectedAnime ? "#dc2626" : "#374151",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                      onPress={() => setShowDropdown(true)}
                    >
                      <Text
                        style={{
                          color: selectedAnime ? "#ffffff" : "#666666",
                          fontSize: 16,
                        }}
                      >
                        {selectedAnime
                          ? selectedAnime.title
                          : "Select an anime..."}
                      </Text>
                      <Ionicons
                        name={showDropdown ? "chevron-up" : "chevron-down"}
                        size={20}
                        color="#dc2626"
                      />
                    </TouchableOpacity>
                  </View>

                  <View style={{ marginBottom: 24 }}>
                    <Text
                      style={{
                        color: "#9ca3af",
                        fontSize: 14,
                        marginBottom: 8,
                      }}
                    >
                      Your Rating
                    </Text>
                    <StarRating />
                    <Text
                      style={{ color: "#dc2626", fontSize: 14, marginTop: 4 }}
                    >
                      {rating > 0 ? `${rating} out of 5 stars` : "Tap to rate"}
                    </Text>
                  </View>

                  <View style={{ marginBottom: 32 }}>
                    <Text
                      style={{
                        color: "#9ca3af",
                        fontSize: 14,
                        marginBottom: 8,
                      }}
                    >
                      Your Review
                    </Text>
                    <TextInput
                      style={{
                        backgroundColor: "#1a1a1a",
                        borderRadius: 12,
                        paddingHorizontal: 16,
                        paddingVertical: 16,
                        color: "#ffffff",
                        fontSize: 16,
                        borderWidth: 1,
                        borderColor: reviewText ? "#dc2626" : "#374151",
                        minHeight: 150,
                        textAlignVertical: "top",
                      }}
                      placeholder="Write your review here... (minimum 10 characters)"
                      placeholderTextColor="#666666"
                      value={reviewText}
                      onChangeText={setReviewText}
                      multiline
                      selectionColor="#dc2626"
                    />
                    <Text
                      style={{
                        color: reviewText.length >= 10 ? "#10b981" : "#9ca3af",
                        fontSize: 12,
                        marginTop: 8,
                        alignSelf: "flex-end",
                      }}
                    >
                      {reviewText.length}/10 characters minimum
                    </Text>
                  </View>

                  <TouchableOpacity
                    onPress={handlePublish}
                    disabled={
                      isSubmitting ||
                      !selectedAnime ||
                      rating === 0 ||
                      reviewText.length < 10
                    }
                    style={{
                      backgroundColor:
                        isSubmitting ||
                        !selectedAnime ||
                        rating === 0 ||
                        reviewText.length < 10
                          ? "#374151"
                          : "#dc2626",
                      paddingVertical: 18,
                      borderRadius: 12,
                      alignItems: "center",
                      justifyContent: "center",
                      shadowColor: "#dc2626",
                      shadowOffset: { width: 0, height: 4 },
                      shadowOpacity: 0.3,
                      shadowRadius: 8,
                      elevation: 8,
                    }}
                  >
                    {isSubmitting ? (
                      <Text
                        style={{
                          color: "#ffffff",
                          fontSize: 18,
                          fontWeight: "bold",
                        }}
                      >
                        Publishing...
                      </Text>
                    ) : (
                      <Text
                        style={{
                          color: "#ffffff",
                          fontSize: 18,
                          fontWeight: "bold",
                        }}
                      >
                        📢 Publish Review
                      </Text>
                    )}
                  </TouchableOpacity>
                </View>

                <View
                  style={{
                    backgroundColor: "rgba(26, 26, 26, 0.8)",
                    marginHorizontal: 24,
                    borderRadius: 16,
                    padding: 20,
                  }}
                >
                  <Text
                    style={{
                      color: "#ffffff",
                      fontSize: 16,
                      fontWeight: "bold",
                      marginBottom: 12,
                    }}
                  >
                    💡 Review Tips
                  </Text>
                  <View style={{ gap: 8 }}>
                    <Text style={{ color: "#9ca3af", fontSize: 14 }}>
                      • Be honest and constructive
                    </Text>
                    <Text style={{ color: "#9ca3af", fontSize: 14 }}>
                      • Mention what you liked/disliked
                    </Text>
                    <Text style={{ color: "#9ca3af", fontSize: 14 }}>
                      • Avoid spoilers or use spoiler warnings
                    </Text>
                    <Text style={{ color: "#9ca3af", fontSize: 14 }}>
                      • Share your personal experience
                    </Text>
                  </View>
                </View>
              </ScrollView>
            </SafeAreaView>
          </LinearGradient>

          <Modal
            visible={showDropdown}
            animationType="slide"
            transparent={true}
            onRequestClose={() => setShowDropdown(false)}
          >
            <View style={{ flex: 1, backgroundColor: "rgba(0, 0, 0, 0.8)" }}>
              <View
                style={{
                  backgroundColor: "#1a1a1a",
                  marginTop: 100,
                  marginHorizontal: 20,
                  borderRadius: 16,
                  maxHeight: "70%",
                  overflow: "hidden",
                }}
              >
                <View
                  style={{
                    padding: 20,
                    borderBottomWidth: 1,
                    borderBottomColor: "#374151",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        color: "#ffffff",
                        fontSize: 18,
                        fontWeight: "bold",
                      }}
                    >
                      Select Anime
                    </Text>
                    <TouchableOpacity onPress={() => setShowDropdown(false)}>
                      <Ionicons name="close" size={24} color="#dc2626" />
                    </TouchableOpacity>
                  </View>

                  <View
                    style={{
                      backgroundColor: "#000000",
                      borderRadius: 8,
                      paddingHorizontal: 12,
                      paddingVertical: 10,
                      flexDirection: "row",
                      alignItems: "center",
                      marginTop: 16,
                    }}
                  >
                    <Ionicons name="search" size={20} color="#dc2626" />
                    <TextInput
                      style={{
                        flex: 1,
                        color: "#ffffff",
                        fontSize: 16,
                        marginLeft: 8,
                        padding: 0,
                      }}
                      placeholder="Search anime..."
                      placeholderTextColor="#666666"
                      value={searchQuery}
                      onChangeText={setSearchQuery}
                      selectionColor="#dc2626"
                    />
                  </View>
                </View>

                <FlatList
                  data={filteredAnime}
                  renderItem={renderAnimeItem}
                  keyExtractor={(item) => item.id.toString()}
                  style={{ maxHeight: 400 }}
                  showsVerticalScrollIndicator={false}
                  ListEmptyComponent={
                    <Text
                      style={{
                        color: "#9ca3af",
                        textAlign: "center",
                        padding: 20,
                      }}
                    >
                      No anime found
                    </Text>
                  }
                />
              </View>
            </View>
          </Modal>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaProvider>
  );
};

export default Reviews;
