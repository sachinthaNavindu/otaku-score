import { View, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";

const Index = () => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (user) {
        router.replace("/(dashboard)");  
      } else {
        router.replace("/welcomepage"); 
      }
    }
  }, [loading, user]);

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
};

export default Index;
