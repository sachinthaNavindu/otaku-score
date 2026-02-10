import { Text, TouchableOpacity, View, Image } from "react-native";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getUserData } from "@/services/userServices";
import { useUser } from "@/context/UserContext";


interface HeaderProps {
  title?: string;
  showBackButton?: boolean;
  onBackPress?: () => void;
  profileImage?: string;
  onProfilePress?: () => void;
}

const Header = ({
  title = "OtakuScore",
  showBackButton = false,
  onBackPress,
  onProfilePress,
}: HeaderProps) => {
  const {profileImage} = useUser()
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 40,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TouchableOpacity
          onPress={onBackPress || (() => router.push("/(dashboard)/profile"))}
          activeOpacity={0.8}
          style={{
            width: 48,
            height: 48,
            backgroundColor: "#dc2626",
            borderRadius: 999,
            alignItems: "center",
            justifyContent: "center",
            marginRight: 12,
          }}
        >
          <Text style={{ color: "#ffffff", fontWeight: "bold", fontSize: 20 }}>
            OS
          </Text>
        </TouchableOpacity>

        <Text style={{ color: "#ffffff", fontSize: 32, fontWeight: "bold" }}>
          {title.includes("Otaku") ? (
            <>
              Otaku
              <Text style={{ color: "#dc2626" }}>
                {title.replace("Otaku", "")}
              </Text>
            </>
          ) : (
            title
          )}
        </Text>
      </View>

      <TouchableOpacity
        onPress={onProfilePress || (() => router.push("/(dashboard)/profile"))}
        style={{ width: 44, height: 44, borderRadius: 999, overflow: "hidden", borderWidth: 2, borderColor: "#dc2626" }}
      >
        {profileImage ? (
          <Image source={{ uri: profileImage }} style={{ width: "100%", height: "100%" }} />
        ) : (
          <Text style={{ color: "#dc2626", textAlign: "center" }}>OS</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default Header;
