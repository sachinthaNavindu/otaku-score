import {
  Text,
  View,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Image,
  RefreshControl,
  TextInput,
} from "react-native";
import { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import Header from "@/components/Header";

type Anime = {
  id: number;
  title: string;
  score: number;
  episodes: number;
  image: string;
};

const topRatedAnime: Anime[] = [
  {
    id: 5,
    title: "Fullmetal Alchemist: Brotherhood",
    score: 9.5,
    episodes: 64,
    image: "https://picsum.photos/seed/fma1/200/300",
  },
  {
    id: 6,
    title: "Steins;Gate",
    score: 9.2,
    episodes: 24,
    image: "https://picsum.photos/seed/sg1/200/300",
  },
  {
    id: 7,
    title: "Hunter x Hunter",
    score: 9.4,
    episodes: 148,
    image: "https://picsum.photos/seed/hxh1/200/300",
  },
  {
    id: 8,
    title: "Demon Slayer: Kimetsu no Yaiba",
    score: 8.8,
    episodes: 55,
    image: "https://picsum.photos/seed/ds1/200/300",
  },
  {
    id: 9,
    title: "Attack on Titan",
    score: 9.3,
    episodes: 75,
    image: "https://picsum.photos/seed/aot1/200/300",
  },
  {
    id: 10,
    title: "Jujutsu Kaisen",
    score: 9.1,
    episodes: 24,
    image: "https://picsum.photos/seed/jjk1/200/300",
  },
];

const Home = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      // Handle search functionality
    }
  };

  type AnimeCardProps = {
    anime: Anime;
  };

  const AnimeCard = ({ anime }: AnimeCardProps) => (
    <TouchableOpacity
      style={{ width: 150, marginRight: 16 }}
      activeOpacity={0.7}
    >
      <View style={{ borderRadius: 12, overflow: "hidden", marginBottom: 8 }}>
        <Image
          source={{ uri: anime.image }}
          style={{ width: 150, height: 200 }}
          resizeMode="cover"
        />
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.8)"]}
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 80,
          }}
        />
        <View
          style={{
            position: "absolute",
            bottom: 8,
            left: 8,
            right: 8,
          }}
        >
          <Text style={{ color: "#ffffff", fontSize: 14, fontWeight: "600" }}>
            {anime.title.length > 20
              ? anime.title.substring(0, 20) + "..."
              : anime.title}
          </Text>
          <View
            style={{ flexDirection: "row", alignItems: "center", marginTop: 4 }}
          >
            <Ionicons name="star" size={14} color="#dc2626" />
            <Text style={{ color: "#ffffff", fontSize: 12, marginLeft: 4 }}>
              {anime.score}
            </Text>
            <Text style={{ color: "#9ca3af", fontSize: 12, marginLeft: 8 }}>
              {anime.episodes} eps
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaProvider>
      <View style={{ flex: 1, backgroundColor: "#000000" }}>
        <StatusBar barStyle="light-content" backgroundColor="#000000" />

        <LinearGradient colors={["#000000", "#1a0000"]} style={{ flex: 1 }}>
          <SafeAreaView edges={["top"]} style={{ flex: 1 }}>
            <ScrollView
              style={{ flex: 1 }}
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                  tintColor="#dc2626"
                  colors={["#dc2626"]}
                />
              }
            >
              <View style={{ paddingHorizontal: 24, paddingTop: 24 }}>
                <Header />

                {/* Search Bar */}
                <View
                  style={{
                    backgroundColor: "#1a1a1a",
                    borderRadius: 12,
                    paddingHorizontal: 16,
                    paddingVertical: 12,
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 8,
                  }}
                >
                  <Ionicons name="search-outline" size={20} color="#dc2626" />
                  <TextInput
                    style={{
                      flex: 1,
                      color: "#ffffff",
                      fontSize: 16,
                      marginLeft: 12,
                      padding: 0,
                    }}
                    placeholder="Search anime, manga, characters..."
                    placeholderTextColor="#666666"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    onSubmitEditing={handleSearch}
                    returnKeyType="search"
                    selectionColor="#dc2626"
                  />
                  {searchQuery.length > 0 && (
                    <TouchableOpacity onPress={() => setSearchQuery("")}>
                      <Ionicons name="close-circle" size={20} color="#666666" />
                    </TouchableOpacity>
                  )}
                </View>

                <Text
                  style={{ color: "#9ca3af", fontSize: 12, marginBottom: 24 }}
                >
                  Try "One Piece", "Naruto", or "Attack on Titan"
                </Text>

                {/* Add Review Button */}
                <View style={{ alignItems: "center", marginBottom: 24 }}>
                  <TouchableOpacity
                    style={{
                      backgroundColor: "#dc2626",
                      paddingHorizontal: 32,
                      paddingVertical: 16,
                      borderRadius: 12,
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 8,
                      shadowColor: "#dc2626",
                      shadowOffset: {
                        width: 0,
                        height: 4,
                      },
                      shadowOpacity: 0.3,
                      shadowRadius: 8,
                      elevation: 8,
                      borderWidth: 1,
                      borderColor: "rgba(220, 38, 38, 0.3)",
                    }}
                    activeOpacity={0.7}
                    onPress={()=>router.replace("/(dashboard)/reviews")}
                  >
                    <Ionicons
                      name="add-circle-outline"
                      size={22}
                      color="#ffffff"
                    />
                    <Text
                      style={{
                        color: "#ffffff",
                        fontSize: 18,
                        fontWeight: "bold",
                      }}
                    >
                      Add Review
                    </Text>
                  </TouchableOpacity>

                  <Text
                    style={{
                      color: "#9ca3af",
                      fontSize: 12,
                      marginTop: 8,
                      textAlign: "center",
                    }}
                  >
                    Share your thoughts on your favorite anime
                  </Text>
                </View>

                {/* Top Rated Section */}
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 16,
                    marginTop: 32,
                  }}
                >
                  <Text
                    style={{
                      color: "#ffffff",
                      fontSize: 24,
                      fontWeight: "bold",
                    }}
                  >
                    ⭐ Top Rated Anime
                  </Text>
                  <TouchableOpacity>
                    <Text
                      style={{
                        color: "#dc2626",
                        fontSize: 14,
                        fontWeight: "600",
                      }}
                    >
                      See All
                    </Text>
                  </TouchableOpacity>
                </View>

                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={{ marginHorizontal: -24, paddingHorizontal: 24 }}
                >
                  <View style={{ flexDirection: "row", paddingRight: 24 }}>
                    {topRatedAnime.map((anime) => (
                      <AnimeCard key={anime.id} anime={anime} />
                    ))}
                  </View>
                </ScrollView>

                {/* Quick Stats */}
                <View
                  style={{
                    backgroundColor: "rgba(26, 26, 26, 0.8)",
                    borderRadius: 16,
                    padding: 20,
                    marginTop: 32,
                    marginBottom: 40,
                  }}
                >
                  <Text
                    style={{
                      color: "#ffffff",
                      fontSize: 18,
                      fontWeight: "bold",
                      marginBottom: 16,
                    }}
                  >
                    📊 Your Anime Stats
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-around",
                    }}
                  >
                    <View style={{ alignItems: "center" }}>
                      <Text
                        style={{
                          color: "#dc2626",
                          fontSize: 24,
                          fontWeight: "bold",
                        }}
                      >
                        42
                      </Text>
                      <Text style={{ color: "#9ca3af", fontSize: 14 }}>
                        Watching
                      </Text>
                    </View>
                    <View style={{ alignItems: "center" }}>
                      <Text
                        style={{
                          color: "#dc2626",
                          fontSize: 24,
                          fontWeight: "bold",
                        }}
                      >
                        156
                      </Text>
                      <Text style={{ color: "#9ca3af", fontSize: 14 }}>
                        Completed
                      </Text>
                    </View>
                    <View style={{ alignItems: "center" }}>
                      <Text
                        style={{
                          color: "#dc2626",
                          fontSize: 24,
                          fontWeight: "bold",
                        }}
                      >
                        2.8K
                      </Text>
                      <Text style={{ color: "#9ca3af", fontSize: 14 }}>
                        Reviews
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </ScrollView>
          </SafeAreaView>
        </LinearGradient>
      </View>
    </SafeAreaProvider>
  );
};

export default Home;
