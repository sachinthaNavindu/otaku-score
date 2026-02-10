import { View, ActivityIndicator } from "react-native";
import { Redirect } from "expo-router";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
import { fetchCurrentSeasonAnime } from "@/services/animeApiService";
import { saveAnimeNamesToFirestore } from "@/services/animeService";

export default function Index() {
  const { user, loading } = useAuth();
 useEffect(() => {
  const fetchAndSaveAnime = async () => {
    try {
      const animeList = await fetchCurrentSeasonAnime(); 
      if (animeList.length > 0) {
        await saveAnimeNamesToFirestore(animeList);
      }
    } catch (error) {
      console.error("Failed to fetch anime names", error);
    }
  };

  fetchAndSaveAnime();
}, []);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#000",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color="#4ade80" />
      </View>
    );
  }

  if (!user) {
    return <Redirect href="/(auth)/login" />;
  }

  return <Redirect href="/(dashboard)" />;
}
