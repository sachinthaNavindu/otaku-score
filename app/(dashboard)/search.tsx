import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StatusBar,
  Image,
  FlatList,
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useState, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/Header";

type Anime = {
  id: string;
  title: string;
  image: string;
  rating: number;
  episodes: number;
  year: number;
  genre: string[];
};

const { width } = Dimensions.get("window");

const Search = () => {
  const [searchText, setSearchText] = useState("");
  const [results, setResults] = useState<Anime[]>([]);
  const [suggestions, setSuggestions] = useState<Anime[]>([]);
  const [topAnime, setTopAnime] = useState<Anime[]>([]);

  const animeList: Anime[] = [
    { id: "1", title: "Attack on Titan", image: "https://picsum.photos/seed/aot/300/420", rating: 9.1, episodes: 88, year: 2013, genre: ["Action"] },
    { id: "2", title: "Demon Slayer", image: "https://picsum.photos/seed/ds/300/420", rating: 8.7, episodes: 55, year: 2019, genre: ["Fantasy"] },
    { id: "3", title: "Jujutsu Kaisen", image: "https://picsum.photos/seed/jjk/300/420", rating: 8.8, episodes: 47, year: 2020, genre: ["Action"] },
    { id: "4", title: "Vinland Saga", image: "https://picsum.photos/seed/vinland/300/420", rating: 8.8, episodes: 48, year: 2019, genre: ["Historical"] },
  ];

  useEffect(() => {
    setTopAnime([...animeList].sort((a, b) => b.rating - a.rating));
  }, []);

  const onChange = (text: string) => {
    setSearchText(text);
    if (!text.trim()) {
      setSuggestions([]);
      return;
    }

    setSuggestions(
      animeList.filter(a =>
        a.title.toLowerCase().includes(text.toLowerCase())
      ).slice(0, 5)
    );
  };

  const submitSearch = () => {
    Keyboard.dismiss();
    setSuggestions([]);
    setResults(
      animeList.filter(a =>
        a.title.toLowerCase().includes(searchText.toLowerCase())
      )
    );
  };

  const renderCard = ({ item }: { item: Anime }) => (
    <TouchableOpacity
      style={{
        width: (width - 48) / 2,
        backgroundColor: "#1a1a1a",
        borderRadius: 12,
        marginBottom: 16,
        overflow: "hidden",
      }}
    >
      <Image source={{ uri: item.image }} style={{ height: 180 }} />
      <View style={{ padding: 10 }}>
        <Text style={{ color: "#fff", fontWeight: "bold" }} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={{ color: "#fbbf24" }}>⭐ {item.rating}</Text>
      </View>
    </TouchableOpacity>
  );

  const listData = searchText ? results : topAnime;

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <LinearGradient colors={["#000", "#1a0000"]} style={{ flex: 1 }}>
        <SafeAreaView style={{ flex: 1 }}>
          <StatusBar barStyle="light-content" />

          <FlatList
            data={listData}
            keyExtractor={(item) => item.id}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: "space-between", paddingHorizontal: 16 }}
            renderItem={renderCard}
            keyboardShouldPersistTaps="handled"
            ListHeaderComponent={
              <>
                <Header />

                {/* Search Bar */}
                <View style={{ padding: 16 }}>
                  <View style={{
                    backgroundColor: "#1a1a1a",
                    borderRadius: 12,
                    flexDirection: "row",
                    alignItems: "center",
                    padding: 12,
                  }}>
                    <Ionicons name="search" size={20} color="#9ca3af" />
                    <TextInput
                      value={searchText}
                      onChangeText={onChange}
                      placeholder="Search anime..."
                      placeholderTextColor="#9ca3af"
                      style={{ color: "#fff", marginLeft: 12, flex: 1 }}
                      onSubmitEditing={submitSearch}
                    />
                  </View>

                  {/* Suggestions */}
                  {suggestions.length > 0 && (
                    <View style={{
                      backgroundColor: "#1a1a1a",
                      borderRadius: 12,
                      marginTop: 8,
                    }}>
                      {suggestions.map(item => (
                        <TouchableOpacity
                          key={item.id}
                          onPress={() => {
                            setSearchText(item.title);
                            setSuggestions([]);
                            submitSearch();
                          }}
                          style={{ padding: 12, borderBottomWidth: 1, borderColor: "#262626" }}
                        >
                          <Text style={{ color: "#fff" }}>{item.title}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}
                </View>

                <Text style={{
                  color: "#fff",
                  fontSize: 22,
                  fontWeight: "bold",
                  paddingHorizontal: 16,
                  marginBottom: 12,
                }}>
                  {searchText ? "Search Results" : "Top Rated Anime"}
                </Text>
              </>
            }
            ListFooterComponent={<View style={{ height: 40 }} />}
          />
        </SafeAreaView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

export default Search;
