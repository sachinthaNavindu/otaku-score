import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Anime = {
  id: number;
  title: string;
  rating: number;
  episodes: number;
};

interface Props {
  data: Anime[];
  onSeeAll?: () => void;
}

const MostPopular = ({ data, onSeeAll }: Props) => {
  return (
    <View style={{ paddingHorizontal: 20, marginBottom: 32 }}>
   
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <Text style={{ color: "#ffffff", fontSize: 24, fontWeight: "bold" }}>
          🔥 Most Popular
        </Text>

        <TouchableOpacity activeOpacity={0.7} onPress={onSeeAll}>
          <Text style={{ color: "#dc2626", fontWeight: "600" }}>
            See All
          </Text>
        </TouchableOpacity>
      </View>

   
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {data.map((anime) => (
          <TouchableOpacity
            key={anime.id}
            activeOpacity={0.8}
            style={{
              width: 140,
              backgroundColor: "#1a1a1a",
              borderRadius: 16,
              overflow: "hidden",
              marginRight: 16,
            }}
          >
            <View
              style={{
                height: 100,
                backgroundColor: "#450a0a",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  color: "#ffffff",
                  fontSize: 16,
                  fontWeight: "bold",
                  textAlign: "center",
                  paddingHorizontal: 8,
                }}
              >
                {anime.title}
              </Text>
            </View>

            <View style={{ padding: 12 }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Ionicons name="star" size={14} color="#fbbf24" />
                  <Text
                    style={{
                      color: "#ffffff",
                      fontWeight: "bold",
                      marginLeft: 4,
                    }}
                  >
                    {anime.rating}
                  </Text>
                </View>

                <Text style={{ color: "#9ca3af", fontSize: 12 }}>
                  {anime.episodes} eps
                </Text>
              </View>

              <TouchableOpacity style={{ marginTop: 8 }} activeOpacity={0.7}>
                <Text
                  style={{
                    color: "#dc2626",
                    fontSize: 12,
                    fontWeight: "600",
                    textAlign: "center",
                  }}
                >
                  View Details
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default MostPopular;
