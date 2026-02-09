import { View, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export type Anime = {
  id: number;
  title: string;
  score: number;
  episodes: number;
  image: string;
};

type AnimeCardProps = {
  anime: Anime;
  onPress?: () => void; 
};

const AnimeCard = ({ anime, onPress }: AnimeCardProps) => {
  return (
    <TouchableOpacity
      style={{ width: 150, marginRight: 16 }}
      activeOpacity={0.7}
      onPress={onPress}
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
          <View style={{ flexDirection: "row", alignItems: "center", marginTop: 4 }}>
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
};

export default AnimeCard;
