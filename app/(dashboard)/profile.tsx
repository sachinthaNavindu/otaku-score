import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
  Image,
  ScrollView,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { useState, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { getAuth } from "firebase/auth";
import { db } from "@/services/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { uploadProfileImage, updateUserData } from "@/services/userServices";
import {
  getUserReviews,
  deleteReviewById,
  Review,
} from "@/services/reviewService";
import { doc, getDoc } from "firebase/firestore";

const Profile = () => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [tempUsername, setTempUsername] = useState(userData.username);
  const [tempEmail, setTempEmail] = useState(userData.email);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [userReviews, setUserReviews] = useState<Review[]>([]);
  const [isLoadingReviews, setIsLoadingReviews] = useState(false);

  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        loadUserData(user.uid);
        loadUserReviews(user.uid);
      } else {
        router.replace("/(auth)/login");
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Required",
          "We need access to your photo library to change your profile picture.",
        );
      }
    })();
  }, []);

  const loadUserData = async (uid: string) => {
    setIsLoadingUser(true);
    try {
      const userRef = doc(db, "users", uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        Alert.alert("Error", "User Profile Not Found");
        setIsLoadingUser(false);
        return;
      }

      const data = userSnap.data();

      setUserData({
        username: data.username ?? "Unknown",
        email: data.email ?? "No email",
      });

      if (data.profileImage) {
        setProfileImage(data.profileImage);
      }
      setTempUsername(data.username ?? "Unknown");
      setTempEmail(data.email ?? "No email");
    } catch (error) {
      console.error("Firestore error:", error);
      Alert.alert("Error", "Failed To Load Profile Data");
    } finally {
      setIsLoadingUser(false);
    }
  };

  const loadUserReviews = async (userId: string) => {
    setIsLoadingReviews(true);
    try {
      const reviews = await getUserReviews(userId);
      setUserReviews(reviews);
    } catch (error) {
      console.error("Error loading reviews:", error);
      Alert.alert("Error", "Failed to load your reviews");
    } finally {
      setIsLoadingReviews(false);
    }
  };

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled && result.assets[0].uri) {
        setIsLoading(true);
        setTimeout(() => {
          setProfileImage(result.assets[0].uri);
          setIsLoading(false);
          Alert.alert("Success", "Profile picture updated successfully!");
        }, 1000);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to pick image. Please try again.");
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!tempUsername.trim()) {
      Alert.alert("Error", "Username cannot be empty");
      return;
    }

    if (!tempEmail.trim() || !tempEmail.includes("@")) {
      Alert.alert("Error", "Please enter a valid email address");
      return;
    }

    setIsLoading(true);

    try {
      let updatedData: any = {
        username: tempUsername.trim(),
        email: tempEmail.trim(),
      };

      if (profileImage && !profileImage.startsWith("https://")) {
        const url = await uploadProfileImage(
          profileImage,
          auth.currentUser!.uid,
        );
        updatedData.profileImage = url;
      }

      await updateUserData(auth.currentUser!.uid, updatedData);
      setUserData(updatedData);

      Alert.alert("Success", "Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      Alert.alert("Error", "Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setTempUsername(userData.username);
    setTempEmail(userData.email);
    setIsEditing(false);
  };

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: () => router.replace("/(auth)/login"),
      },
    ]);
  };

  const handleEditReview = (review: Review) => {
    // Navigate to edit review screen or show edit modal
    Alert.alert("Edit Review", "This would open the edit review screen.", [
      { text: "Cancel", style: "cancel" },
      {
        text: "OK",
        onPress: () => {
          // Navigate to edit screen with review data
          // router.push(`/edit-review/${review.id}`);
        },
      },
    ]);
  };

  const handleDeleteReview = (reviewId: string, animeTitle: string) => {
    Alert.alert(
      "Delete Review",
      `Are you sure you want to delete your review for "${animeTitle}"?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteReviewById(reviewId);
              setUserReviews((prev) =>
                prev.filter((review) => review.id !== reviewId),
              );
              Alert.alert("Success", "Review deleted successfully!");
            } catch (error) {
              Alert.alert("Error", "Failed to delete review");
            }
          },
        },
      ],
    );
  };

  const renderStars = (rating: number) => {
    return (
      <View style={{ flexDirection: "row", marginVertical: 4 }}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Ionicons
            key={star}
            name={star <= rating ? "star" : "star-outline"}
            size={16}
            color="#dc2626"
            style={{ marginRight: 2 }}
          />
        ))}
        <Text style={{ color: "#dc2626", marginLeft: 8, fontSize: 14 }}>
          {rating.toFixed(1)}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaProvider>
      <View style={{ flex: 1, backgroundColor: "#000000" }}>
        <StatusBar barStyle="light-content" backgroundColor="#000000" />

        <LinearGradient colors={["#000000", "#1a0000"]} style={{ flex: 1 }}>
          <SafeAreaView edges={["top"]} style={{ flex: 1 }}>
            <ScrollView
              style={{ flex: 1 }}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 40 }}
            >
              <View
                style={{
                  paddingHorizontal: 24,
                  paddingTop: 24,
                  marginBottom: 32,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <TouchableOpacity
                    onPress={() => router.back()}
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 20,
                      backgroundColor: "rgba(26, 26, 26, 0.8)",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Ionicons name="arrow-back" size={24} color="#ffffff" />
                  </TouchableOpacity>

                  <Text
                    style={{
                      color: "#ffffff",
                      fontSize: 20,
                      fontWeight: "bold",
                    }}
                  >
                    Profile
                  </Text>

                  <View style={{ width: 40 }} />
                </View>
              </View>

              <View style={{ alignItems: "center", marginBottom: 40 }}>
                <TouchableOpacity onPress={pickImage} disabled={isLoading}>
                  <View style={{ position: "relative" }}>
                    <View
                      style={{
                        width: 120,
                        height: 120,
                        borderRadius: 60,
                        backgroundColor: "#1a1a1a",
                        alignItems: "center",
                        justifyContent: "center",
                        borderWidth: 3,
                        borderColor: "#dc2626",
                      }}
                    >
                      {profileImage ? (
                        <Image
                          source={{ uri: profileImage }}
                          style={{
                            width: 114,
                            height: 114,
                            borderRadius: 57,
                          }}
                          resizeMode="cover"
                        />
                      ) : (
                        <Ionicons name="person" size={50} color="#dc2626" />
                      )}
                    </View>

                    <View
                      style={{
                        position: "absolute",
                        bottom: 0,
                        right: 0,
                        backgroundColor: "#dc2626",
                        width: 36,
                        height: 36,
                        borderRadius: 18,
                        alignItems: "center",
                        justifyContent: "center",
                        borderWidth: 3,
                        borderColor: "#000000",
                      }}
                    >
                      <Ionicons name="camera" size={18} color="#ffffff" />
                    </View>

                    {isLoading && (
                      <View
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          backgroundColor: "rgba(0, 0, 0, 0.7)",
                          borderRadius: 60,
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <ActivityIndicator color="#dc2626" size="large" />
                      </View>
                    )}
                  </View>
                </TouchableOpacity>

                <Text style={{ color: "#9ca3af", fontSize: 12, marginTop: 8 }}>
                  Tap to change photo
                </Text>
              </View>

              <View
                style={{
                  backgroundColor: "rgba(26, 26, 26, 0.8)",
                  marginHorizontal: 24,
                  borderRadius: 16,
                  padding: 24,
                  marginBottom: 32,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 24,
                  }}
                >
                  <Text
                    style={{
                      color: "#ffffff",
                      fontSize: 20,
                      fontWeight: "bold",
                    }}
                  >
                    Profile Information
                  </Text>

                  <TouchableOpacity
                    onPress={() => {
                      if (isEditing) {
                        handleSave();
                      } else {
                        setIsEditing(true);
                      }
                    }}
                    style={{
                      backgroundColor: "#dc2626",
                      paddingHorizontal: 20,
                      paddingVertical: 8,
                      borderRadius: 8,
                    }}
                  >
                    <Text style={{ color: "#ffffff", fontWeight: "600" }}>
                      {isEditing ? "Save" : "Edit"}
                    </Text>
                  </TouchableOpacity>
                </View>

                <View style={{ marginBottom: 20 }}>
                  <Text
                    style={{ color: "#9ca3af", fontSize: 14, marginBottom: 6 }}
                  >
                    Username
                  </Text>
                  {isEditing ? (
                    <TextInput
                      style={{
                        backgroundColor: "#1a1a1a",
                        borderRadius: 8,
                        paddingHorizontal: 16,
                        paddingVertical: 12,
                        color: "#ffffff",
                        fontSize: 16,
                        borderWidth: 1,
                        borderColor: "#dc2626",
                      }}
                      value={tempUsername}
                      onChangeText={setTempUsername}
                      placeholder="Enter username"
                      placeholderTextColor="#666666"
                      selectionColor="#dc2626"
                    />
                  ) : (
                    <Text
                      style={{
                        color: "#ffffff",
                        fontSize: 18,
                        fontWeight: "600",
                      }}
                    >
                      {userData.username}
                    </Text>
                  )}
                </View>

                <View style={{ marginBottom: 20 }}>
                  <Text
                    style={{ color: "#9ca3af", fontSize: 14, marginBottom: 6 }}
                  >
                    Email
                  </Text>
                  {isEditing ? (
                    <TextInput
                      style={{
                        backgroundColor: "#1a1a1a",
                        borderRadius: 8,
                        paddingHorizontal: 16,
                        paddingVertical: 12,
                        color: "#ffffff",
                        fontSize: 16,
                        borderWidth: 1,
                        borderColor: "#dc2626",
                      }}
                      value={tempEmail}
                      onChangeText={setTempEmail}
                      placeholder="Enter email"
                      placeholderTextColor="#666666"
                      selectionColor="#dc2626"
                      keyboardType="email-address"
                      autoCapitalize="none"
                    />
                  ) : (
                    <Text
                      style={{
                        color: "#ffffff",
                        fontSize: 18,
                        fontWeight: "600",
                      }}
                    >
                      {userData.email}
                    </Text>
                  )}
                </View>
                {isEditing && (
                  <TouchableOpacity
                    onPress={handleCancel}
                    style={{
                      backgroundColor: "#374151",
                      paddingHorizontal: 20,
                      paddingVertical: 12,
                      borderRadius: 8,
                      alignItems: "center",
                      marginTop: 24,
                    }}
                  >
                    <Text style={{ color: "#ffffff", fontWeight: "600" }}>
                      Cancel
                    </Text>
                  </TouchableOpacity>
                )}
              </View>

              {/* My Reviews Section */}
              <View
                style={{
                  backgroundColor: "rgba(26, 26, 26, 0.8)",
                  marginHorizontal: 24,
                  borderRadius: 16,
                  padding: 24,
                  marginBottom: 32,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 24,
                  }}
                >
                  <Text
                    style={{
                      color: "#ffffff",
                      fontSize: 20,
                      fontWeight: "bold",
                    }}
                  >
                    My Reviews
                  </Text>
                  <Text
                    style={{
                      color: "#dc2626",
                      fontSize: 14,
                      fontWeight: "600",
                    }}
                  >
                    {userReviews.length} reviews
                  </Text>
                </View>

                {isLoadingReviews ? (
                  <View style={{ alignItems: "center", paddingVertical: 40 }}>
                    <ActivityIndicator color="#dc2626" size="large" />
                    <Text style={{ color: "#9ca3af", marginTop: 12 }}>
                      Loading reviews...
                    </Text>
                  </View>
                ) : userReviews.length > 0 ? (
                  userReviews.map((review) => (
                    <View
                      key={review.id}
                      style={{
                        backgroundColor: "#1a1a1a",
                        borderRadius: 12,
                        padding: 16,
                        marginBottom: 16,
                        borderLeftWidth: 4,
                        borderLeftColor: "#dc2626",
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          marginBottom: 8,
                        }}
                      >
                        <View style={{ flex: 1 }}>
                          <Text
                            style={{
                              color: "#ffffff",
                              fontSize: 16,
                              fontWeight: "bold",
                              marginBottom: 4,
                            }}
                            numberOfLines={2}
                          >
                            {review.animeTitle}
                          </Text>
                          {renderStars(review.rating)}
                        </View>
                        <View style={{ flexDirection: "row" }}>
                          <TouchableOpacity
                            onPress={() => handleEditReview(review)}
                            style={{
                              backgroundColor: "#3b82f6",
                              paddingHorizontal: 12,
                              paddingVertical: 6,
                              borderRadius: 6,
                              marginRight: 8,
                            }}
                          >
                            <Ionicons name="pencil" size={16} color="#ffffff" />
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() =>
                              handleDeleteReview(review.id, review.animeTitle)
                            }
                            style={{
                              backgroundColor: "#dc2626",
                              paddingHorizontal: 12,
                              paddingVertical: 6,
                              borderRadius: 6,
                            }}
                          >
                            <Ionicons name="trash" size={16} color="#ffffff" />
                          </TouchableOpacity>
                        </View>
                      </View>

                      <Text
                        style={{
                          color: "#d1d5db",
                          fontSize: 14,
                          lineHeight: 20,
                        }}
                        numberOfLines={3}
                      >
                        {review.content}
                      </Text>

                      {review.createdAt && (
                        <Text
                          style={{
                            color: "#6b7280",
                            fontSize: 12,
                            marginTop: 8,
                            fontStyle: "italic",
                          }}
                        >
                          {review.createdAt.toDate?.().toLocaleDateString() ||
                            "Recently"}
                        </Text>
                      )}
                    </View>
                  ))
                ) : (
                  <View style={{ alignItems: "center", paddingVertical: 40 }}>
                    <Ionicons
                      name="document-text-outline"
                      size={48}
                      color="#4b5563"
                    />
                    <Text
                      style={{
                        color: "#9ca3af",
                        fontSize: 16,
                        marginTop: 16,
                        textAlign: "center",
                      }}
                    >
                      You haven't written any reviews yet.
                    </Text>
                    <TouchableOpacity
                      onPress={() => router.push("/(dashboard)")}
                      style={{
                        marginTop: 16,
                        paddingHorizontal: 20,
                        paddingVertical: 10,
                        backgroundColor: "#dc2626",
                        borderRadius: 8,
                      }}
                    >
                      <Text style={{ color: "#ffffff", fontWeight: "600" }}>
                        Browse Anime
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>

              <TouchableOpacity
                onPress={handleLogout}
                style={{
                  backgroundColor: "rgba(220, 38, 38, 0.1)",
                  marginHorizontal: 24,
                  paddingVertical: 16,
                  borderRadius: 12,
                  borderWidth: 1,
                  borderColor: "#dc2626",
                  alignItems: "center",
                  marginBottom: 40,
                }}
              >
                <Text
                  style={{ color: "#dc2626", fontSize: 16, fontWeight: "600" }}
                >
                  Logout
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </SafeAreaView>
        </LinearGradient>
      </View>
    </SafeAreaProvider>
  );
};

export default Profile;
