import {
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  StatusBar,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const Index = () => {
  const popularAnime = [
    { id: 1, title: "Attack on Titan", rating: 9.2, episodes: 89 },
    { id: 2, title: "Demon Slayer", rating: 8.9, episodes: 55 },
    { id: 3, title: "Jujutsu Kaisen", rating: 8.7, episodes: 47 },
    { id: 4, title: "Chainsaw Man", rating: 8.8, episodes: 12 },
  ];

  const topRatedAnime = [
    { id: 1, title: "Fullmetal Alchemist: Brotherhood", rating: 9.5, reviews: 1250 },
    { id: 2, title: "Steins;Gate", rating: 9.3, reviews: 980 },
    { id: 3, title: "Hunter x Hunter", rating: 9.1, reviews: 1560 },
    { id: 4, title: "Vinland Saga", rating: 9.0, reviews: 870 },
  ];

  const userProfile = {
    name: "AnimeMaster",
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#000000" }}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      
      <LinearGradient
        colors={["#000000", "#1a0000"]}
        style={{ flex: 1 }}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
          >
            <View style={{ paddingHorizontal: 20, paddingTop: 16, paddingBottom: 16 }}>
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <View style={{ width: 44, height: 44, backgroundColor: "#dc2626", borderRadius: 999, alignItems: "center", justifyContent: "center", marginRight: 12 }}>
                    <Text style={{ color: "#ffffff", fontWeight: "bold", fontSize: 18 }}>OS</Text>
                  </View>
                  <Text style={{ color: "#ffffff", fontSize: 28, fontWeight: "bold" }}>
                    Otaku<Text style={{ color: "#dc2626" }}>Score</Text>
                  </Text>
                </View>
                
                <TouchableOpacity activeOpacity={0.7}>
                  <View style={{ width: 44, height: 44, backgroundColor: "#1a1a1a", borderRadius: 999, alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                    <Ionicons name="person" size={24} color="#dc2626" />
                  </View>
                </TouchableOpacity>
              </View>

              <View style={{ marginTop: 24 }}>
                <Text style={{ color: "#ffffff", fontSize: 32, fontWeight: "bold", marginBottom: 8 }}>
                  Welcome back,{"\n"}
                  <Text style={{ color: "#dc2626" }}>{userProfile.name}!</Text>
                </Text>
                <Text style={{ color: "#9ca3af", fontSize: 16 }}>
                  Discover the latest anime reviews from our community
                </Text>
              </View>
            </View>

            <View style={{ paddingHorizontal: 20, marginBottom: 32 }}>
              <View style={{ flexDirection: "row", justifyContent: "space-between", backgroundColor: "#1a1a1a", borderRadius: 16, padding: 20 }}>
                <View style={{ alignItems: "center", flex: 1 }}>
                  <Text style={{ color: "#dc2626", fontSize: 28, fontWeight: "bold" }}>156</Text>
                  <Text style={{ color: "#9ca3af", fontSize: 14, marginTop: 4 }}>Following</Text>
                </View>
                <View style={{ height: 40, width: 1, backgroundColor: "#374151" }} />
                <View style={{ alignItems: "center", flex: 1 }}>
                  <Text style={{ color: "#dc2626", fontSize: 28, fontWeight: "bold" }}>42</Text>
                  <Text style={{ color: "#9ca3af", fontSize: 14, marginTop: 4 }}>Reviews</Text>
                </View>
                <View style={{ height: 40, width: 1, backgroundColor: "#374151" }} />
                <View style={{ alignItems: "center", flex: 1 }}>
                  <Text style={{ color: "#dc2626", fontSize: 28, fontWeight: "bold" }}>18</Text>
                  <Text style={{ color: "#9ca3af", fontSize: 14, marginTop: 4 }}>Watching</Text>
                </View>
              </View>
            </View>

            <View style={{ paddingHorizontal: 20, marginBottom: 32 }}>
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <Text style={{ color: "#ffffff", fontSize: 24, fontWeight: "bold" }}>
                  🔥 Most Popular
                </Text>
                <TouchableOpacity activeOpacity={0.7}>
                  <Text style={{ color: "#dc2626", fontWeight: "600" }}>See All</Text>
                </TouchableOpacity>
              </View>

              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 8 }}>
                {popularAnime.map((anime) => (
                  <TouchableOpacity
                    key={anime.id}
                    style={{ width: 140, backgroundColor: "#1a1a1a", borderRadius: 16, overflow: "hidden", marginRight: 16 }}
                    activeOpacity={0.8}
                  >
                    <View style={{ height: 100, backgroundColor: "#450a0a", alignItems: "center", justifyContent: "center" }}>
                      <Text style={{ color: "#ffffff", fontSize: 16, fontWeight: "bold", textAlign: "center", paddingHorizontal: 8 }}>
                        {anime.title}
                      </Text>
                    </View>
                    <View style={{ padding: 12 }}>
                      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                          <Ionicons name="star" size={14} color="#fbbf24" />
                          <Text style={{ color: "#ffffff", fontWeight: "bold", marginLeft: 4 }}>{anime.rating}</Text>
                        </View>
                        <Text style={{ color: "#9ca3af", fontSize: 12 }}>{anime.episodes} eps</Text>
                      </View>
                      <TouchableOpacity style={{ marginTop: 8 }} activeOpacity={0.7}>
                        <Text style={{ color: "#dc2626", fontSize: 12, fontWeight: "600", textAlign: "center" }}>
                          View Details
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            <View style={{ paddingHorizontal: 20, marginBottom: 32 }}>
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <Text style={{ color: "#ffffff", fontSize: 24, fontWeight: "bold" }}>
                  ⭐ Top Rated
                </Text>
                <TouchableOpacity activeOpacity={0.7}>
                  <Text style={{ color: "#dc2626", fontWeight: "600" }}>See All</Text>
                </TouchableOpacity>
              </View>

              <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", gap: 12 }}>
                {topRatedAnime.map((anime) => (
                  <TouchableOpacity
                    key={anime.id}
                    style={{ width: "48%", backgroundColor: "#1a1a1a", borderRadius: 16, overflow: "hidden" }}
                    activeOpacity={0.8}
                  >
                    <View style={{ height: 120, backgroundColor: "#450a0a", alignItems: "center", justifyContent: "center", padding: 12 }}>
                      <Text style={{ color: "#ffffff", fontSize: 16, fontWeight: "bold", textAlign: "center" }}>
                        {anime.title}
                      </Text>
                    </View>
                    <View style={{ padding: 12 }}>
                      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                          <Ionicons name="star" size={14} color="#fbbf24" />
                          <Text style={{ color: "#ffffff", fontWeight: "bold", marginLeft: 4 }}>{anime.rating}</Text>
                        </View>
                        <Text style={{ color: "#9ca3af", fontSize: 10 }}>{anime.reviews} reviews</Text>
                      </View>
                      <TouchableOpacity style={{ marginTop: 8 }} activeOpacity={0.7}>
                        <View style={{ backgroundColor: "rgba(220, 38, 38, 0.2)", paddingVertical: 6, borderRadius: 8 }}>
                          <Text style={{ color: "#dc2626", fontSize: 12, fontWeight: "600", textAlign: "center" }}>
                            Rate Now
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
};

export default Index;