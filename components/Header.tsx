import { Text, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";

interface HeaderProps {
  title?: string;
  showBackButton?: boolean;
  onBackPress?: () => void;
}

const Header = ({ 
  title = "OtakuScore", 
  showBackButton = false,
  onBackPress 
}: HeaderProps) => {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 40 }}>
      <View style={{ 
        width: 48, 
        height: 48, 
        backgroundColor: "#dc2626", 
        borderRadius: 999, 
        alignItems: "center", 
        justifyContent: "center", 
        marginRight: 12 
      }}>
        <TouchableOpacity 
          onPress={onBackPress || (() => router.push("/"))}
        >
          <Text style={{ color: "#ffffff", fontWeight: "bold", fontSize: 20 }}>OS</Text>
        </TouchableOpacity>
      </View>
      <Text style={{ color: "#ffffff", fontSize: 32, fontWeight: "bold" }}>
        {title.includes("Otaku") ? (
          <>
            Otaku<Text style={{ color: "#dc2626" }}>{title.replace("Otaku", "")}</Text>
          </>
        ) : (
          title
        )}
      </Text>
    </View>
  );
};

export default Header;