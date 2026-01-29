import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Modal,
  FlatList,
  Dimensions,
  Keyboard,
} from "react-native";
import { useState, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/Header";

type Anime = {
  id: string;
  title: string;
};

const { height: screenHeight } = Dimensions.get("window");

const NewReview = () => {
  const [selectedAnime, setSelectedAnime] = useState<string>("");
  const [reviewText, setReviewText] = useState<string>("");
  const [rating, setRating] = useState<number>(5);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>("");
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<Anime[]>([]);
  const [keyboardHeight, setKeyboardHeight] = useState<number>(0);

  const animeList: Anime[] = [
    { id: "aot", title: "Attack on Titan" },
    { id: "ds", title: "Demon Slayer" },
    { id: "jjk", title: "Jujutsu Kaisen" },
    { id: "op", title: "One Piece" },
    { id: "fmab", title: "Fullmetal Alchemist: Brotherhood" },
    { id: "hxh", title: "Hunter x Hunter" },
    { id: "cs", title: "Chainsaw Man" },
    { id: "sg", title: "Steins;Gate" },
    { id: "nge", title: "Neon Genesis Evangelion" },
    { id: "cb", title: "Cowboy Bebop" },
    { id: "bnh", title: "My Hero Academia" },
    { id: "spyx", title: "Spy x Family" },
    { id: "trigun", title: "Trigun Stampede" },
    { id: "mp100", title: "Mob Psycho 100" },
  ];

  const getSelectedAnimeTitle = (): string => {
    const anime = animeList.find((a) => a.id === selectedAnime);
    return anime?.title || "";
  };

  const handlePublish = () => {
    if (!selectedAnime) return Alert.alert("Missing Anime", "Please select an anime to review.");
    if (!reviewText.trim()) return Alert.alert("Missing Review", "Please write your review.");

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      Alert.alert(
        "Review Published!",
        `Your review for ${getSelectedAnimeTitle()} has been published successfully.`,
        [
          {
            text: "OK",
            onPress: () => {
              setSelectedAnime("");
              setReviewText("");
              setRating(5);
              setSearchText("");
              setSearchResults([]);
            },
          },
        ]
      );
    }, 1500);
  };

  const handleSearch = (text: string) => {
    setSearchText(text);
    if (!text.trim()) {
      setSearchResults([]);
      return;
    }

    const filtered = animeList.filter((a) =>
      a.title.toLowerCase().includes(text.toLowerCase())
    );
    setSearchResults(filtered);
  };

  const renderStars = () => {
    return Array.from({ length: 10 }, (_, i) => (
      <TouchableOpacity
        key={i + 1}
        onPress={() => setRating(i + 1)}
        style={{ marginHorizontal: 2 }}
      >
        <Ionicons
          name={i + 1 <= rating ? "star" : "star-outline"}
          size={28}
          color={i + 1 <= rating ? "#fbbf24" : "#9ca3af"}
        />
      </TouchableOpacity>
    ));
  };

  useEffect(() => {
    const showSub = Keyboard.addListener("keyboardDidShow", (e) =>
      setKeyboardHeight(e.endCoordinates.height)
    );
    const hideSub = Keyboard.addListener("keyboardDidHide", () => setKeyboardHeight(0));

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={{ flex: 1, backgroundColor: "#000" }}>
        <StatusBar barStyle="light-content" backgroundColor="#000" />
        <LinearGradient colors={["#000", "#1a0000"]} style={{ flex: 1 }}>
          <SafeAreaView style={{ flex: 1 }}>
            <ScrollView 
              contentContainerStyle={{ paddingBottom: 40 }} 
              showsVerticalScrollIndicator={false}
            >
              <View style={{ paddingHorizontal: 24, paddingTop: 24, paddingBottom: 16 }}>
                <Header/>
                <Text style={{ color: "#fff", fontSize: 32, fontWeight: "bold", marginBottom: 8 }}>
                  Share Your Thoughts
                </Text>
                <Text style={{ color: "#9ca3af", fontSize: 16, marginBottom: 32 }}>
                  Create a review for your favorite anime
                </Text>
              </View>

              <View style={{ paddingHorizontal: 24, marginBottom: 24 }}>
                <Text style={{ color: "#fff", fontSize: 18, fontWeight: "600", marginBottom: 12 }}>
                  Select Anime
                </Text>
                <TouchableOpacity
                  onPress={() => setShowDropdown(true)}
                  style={{
                    backgroundColor: "#1a1a1a",
                    borderRadius: 12,
                    padding: 16,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ color: selectedAnime ? "#fff" : "#9ca3af", fontSize: 16, flex: 1 }}>
                    {selectedAnime ? getSelectedAnimeTitle() : "Select an anime..."}
                  </Text>
                  <Ionicons name="chevron-down" size={24} color="#9ca3af" />
                </TouchableOpacity>
              </View>

              {selectedAnime && (
                <View style={{ paddingHorizontal: 24, marginBottom: 24 }}>
                  <Text style={{ color: "#fff", fontSize: 18, fontWeight: "600", marginBottom: 12 }}>
                    Selected Anime
                  </Text>
                  <View
                    style={{
                      backgroundColor: "#450a0a",
                      borderRadius: 12,
                      padding: 16,
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Ionicons name="tv-outline" size={24} color="#dc2626" style={{ marginRight: 12 }} />
                    <View style={{ flex: 1 }}>
                      <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>
                        {getSelectedAnimeTitle()}
                      </Text>
                      <Text style={{ color: "#9ca3af", fontSize: 14, marginTop: 4 }}>Ready for your review</Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => {
                        setSelectedAnime("");
                        setSearchText("");
                        setSearchResults([]);
                      }}
                      style={{ padding: 8 }}
                    >
                      <Ionicons name="close-circle" size={24} color="#dc2626" />
                    </TouchableOpacity>
                  </View>
                </View>
              )}

              <View style={{ paddingHorizontal: 24, marginBottom: 24 }}>
                <Text style={{ color: "#fff", fontSize: 18, fontWeight: "600", marginBottom: 16 }}>
                  Your Rating
                </Text>
                <View style={{ alignItems: "center", marginBottom: 16 }}>
                  <View style={{ flexDirection: "row", justifyContent: "center", marginBottom: 8 }}>
                    {renderStars()}
                  </View>
                  <Text style={{ color: "#fbbf24", fontSize: 24, fontWeight: "bold", marginTop: 8 }}>
                    {rating}/10
                  </Text>
                  <Text style={{ color: "#9ca3af", fontSize: 14, marginTop: 4 }}>
                    {rating <= 3 ? "Poor" : rating <= 5 ? "Average" : rating <= 7 ? "Good" : rating <= 9 ? "Great" : "Masterpiece"}
                  </Text>
                </View>
              </View>

              <View style={{ paddingHorizontal: 24, marginBottom: 32 }}>
                <Text style={{ color: "#fff", fontSize: 18, fontWeight: "600", marginBottom: 12 }}>
                  Your Review
                </Text>
                <View style={{ backgroundColor: "#1a1a1a", borderRadius: 12, padding: 16 }}>
                  <TextInput
                    style={{ color: "#fff", fontSize: 16, minHeight: 150, textAlignVertical: "top" }}
                    placeholder="Share your thoughts about this anime..."
                    placeholderTextColor="#666"
                    value={reviewText}
                    onChangeText={setReviewText}
                    multiline
                    maxLength={1000}
                  />
                  <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 12 }}>
                    <Text style={{ color: "#6b7280", fontSize: 12 }}>Be honest and detailed in your review</Text>
                    <Text style={{ color: reviewText.length >= 900 ? "#dc2626" : "#9ca3af", fontSize: 12 }}>
                      {reviewText.length}/1000
                    </Text>
                  </View>
                </View>
              </View>

              <View style={{ paddingHorizontal: 24, marginBottom: 32 }}>
                <View style={{ backgroundColor: "#1a1a1a", borderRadius: 12, padding: 16 }}>
                  <Text style={{ color: "#fbbf24", fontSize: 18, fontWeight: "bold", marginBottom: 8 }}>
                    Review Guidelines
                  </Text>
                  <Text style={{ color: "#9ca3af", fontSize: 14, marginBottom: 4 }}>
                    • Be honest and constructive in your feedback.
                  </Text>
                  <Text style={{ color: "#9ca3af", fontSize: 14, marginBottom: 4 }}>
                    • Avoid spoilers unless you mark them clearly.
                  </Text>
                  <Text style={{ color: "#9ca3af", fontSize: 14, marginBottom: 4 }}>
                    • Focus on the anime's story, characters, animation, and music.
                  </Text>
                  <Text style={{ color: "#9ca3af", fontSize: 14, marginBottom: 4 }}>
                    • Keep your review respectful and appropriate for all users.
                  </Text>
                  <Text style={{ color: "#9ca3af", fontSize: 14 }}>
                    • Maximum review length: 1000 characters.
                  </Text>
                </View>
              </View>

              <View style={{ paddingHorizontal: 24, marginBottom: 40 }}>
                <TouchableOpacity
                  onPress={handlePublish}
                  disabled={isSubmitting || !selectedAnime || !reviewText.trim()}
                  style={{
                    backgroundColor: isSubmitting || !selectedAnime || !reviewText.trim() ? "#374151" : "#dc2626",
                    paddingVertical: 16,
                    borderRadius: 12,
                    alignItems: "center",
                  }}
                >
                  <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>
                    {isSubmitting ? "Publishing..." : "Publish Review"}
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </SafeAreaView>
        </LinearGradient>
      </View>

      <Modal 
        visible={showDropdown} 
        transparent 
        animationType="slide" 
        onRequestClose={() => setShowDropdown(false)}
      >
        <TouchableOpacity
          style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.8)" }}
          activeOpacity={1}
          onPress={() => {
            setShowDropdown(false);
            setSearchResults([]);
            Keyboard.dismiss();
          }}
        >
          <View style={{ flex: 1, justifyContent: "flex-end" }}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={(e) => e.stopPropagation()}
              style={{
                backgroundColor: "#1a1a1a",
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                maxHeight: screenHeight - keyboardHeight - 50,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: 20,
                  borderBottomWidth: 1,
                  borderBottomColor: "#374151",
                }}
              >
                <Text style={{ color: "#fff", fontSize: 20, fontWeight: "bold" }}>Search Anime</Text>
                <TouchableOpacity
                  onPress={() => {
                    setShowDropdown(false);
                    setSearchResults([]);
                    Keyboard.dismiss();
                  }}
                >
                  <Ionicons name="close" size={24} color="#9ca3af" />
                </TouchableOpacity>
              </View>

              <View style={{ padding: 16 }}>
                <View
                  style={{
                    backgroundColor: "#262626",
                    borderRadius: 12,
                    paddingHorizontal: 16,
                    paddingVertical: 12,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Ionicons name="search" size={20} color="#9ca3af" style={{ marginRight: 12 }} />
                  <TextInput
                    value={searchText}
                    onChangeText={handleSearch}
                    placeholder="Search anime titles..."
                    placeholderTextColor="#9ca3af"
                    style={{ color: "#fff", fontSize: 16, flex: 1 }}
                    autoFocus
                  />
                  {searchText.length > 0 && (
                    <TouchableOpacity
                      onPress={() => {
                        setSearchText("");
                        setSearchResults([]);
                      }}
                    >
                      <Ionicons name="close-circle" size={20} color="#9ca3af" />
                    </TouchableOpacity>
                  )}
                </View>
              </View>

              <FlatList
                data={searchText.trim() === "" ? animeList : searchResults}
                keyExtractor={(item: Anime) => item.id}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedAnime(item.id);
                      setSearchText(item.title);
                      setShowDropdown(false);
                      setSearchResults([]);
                      Keyboard.dismiss();
                    }}
                    style={{
                      paddingVertical: 16,
                      paddingHorizontal: 20,
                      borderBottomWidth: 1,
                      borderBottomColor: "#262626",
                      backgroundColor: selectedAnime === item.id ? "#450a0a" : "transparent",
                    }}
                  >
                    <Text style={{ color: "#fff", fontSize: 16, fontWeight: selectedAnime === item.id ? "600" : "400" }}>
                      {item.title}
                    </Text>
                  </TouchableOpacity>
                )}
                keyboardShouldPersistTaps="handled"
              />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </KeyboardAvoidingView>
  );
};

export default NewReview;