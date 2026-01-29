import { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { router } from "expo-router";
import { useAuth } from "@/hooks/useAuth";

export default function Logout() {
  const { logout } = useAuth();

  useEffect(() => {
    logout(); 
    router.replace("/(auth)/login");
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#000" }}>
      <ActivityIndicator size="large" color="#dc2626" />
    </View>
  );
}
