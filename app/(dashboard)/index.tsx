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
import MostPopular from "@/components/MostPopular";
import Header from "@/components/Header";
import TopRated from "@/components/TopRated";

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
              <Header/>

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

            <MostPopular
              data={popularAnime}
              onSeeAll={() => {
                console.log("Navigate to popular anime list");
              }}
            />

            <TopRated
              data={topRatedAnime}
              onSeeAll={() => {
                console.log("Navigate to top rated anime list");
              }}
             
            />
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
};

export default Index;