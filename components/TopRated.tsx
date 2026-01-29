import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Anime = {
  id: number;
  title: string;
  rating: number;
  reviews: number;
};

interface Props {
  data: Anime[];
  onSeeAll?: () => void;
  onRate?: (animeId: number) => void;
}

const TopRated = ({ data, onSeeAll, onRate }: Props) => {
  return (
    <View style={{ paddingHorizontal: 20, marginBottom: 32 }}>
      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <Text style={{ color: "#ffffff", fontSize: 24, fontWeight: "bold" }}>
          ⭐ Top Rated
        </Text>

        <TouchableOpacity activeOpacity={0.7} onPress={onSeeAll}>
          <Text style={{ color: "#dc2626", fontWeight: "600" }}>
            See All
          </Text>
        </TouchableOpacity>
      </View>

      {/* Grid */}
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
          gap: 12,
        }}
      >
        {data.map((anime) => (
          <TouchableOpacity
            key={anime.id}
            activeOpacity={0.8}
            style={{
              width: "48%",
              backgroundColor: "#1a1a1a",
              borderRadius: 16,
              overflow: "hidden",
            }}
          >
            <View
              style={{
                height: 120,
                backgroundColor: "#450a0a",
                alignItems: "center",
                justifyContent: "center",
                padding: 12,
              }}
            >
              <Text
                style={{
                  color: "#ffffff",
                  fontSize: 16,
                  fontWeight: "bold",
                  textAlign: "center",
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

                <Text style={{ color: "#9ca3af", fontSize: 10 }}>
                  {anime.reviews} reviews
                </Text>
              </View>

              <TouchableOpacity
                style={{ marginTop: 8 }}
                activeOpacity={0.7}
                onPress={() => onRate?.(anime.id)}
              >
                <View
                  style={{
                    backgroundColor: "rgba(220, 38, 38, 0.2)",
                    paddingVertical: 6,
                    borderRadius: 8,
                  }}
                >
                  <Text
                    style={{
                      color: "#dc2626",
                      fontSize: 12,
                      fontWeight: "600",
                      textAlign: "center",
                    }}
                  >
                    Rate Now
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default TopRated;
