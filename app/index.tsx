import {
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  StatusBar,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Redirect, router } from "expo-router";
import Header from "@/components/Header";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";

const App = () => {
  const {user,loading} = useAuth()
  const featuredAnime = [
    { id: 1, title: "Attack on Titan", rating: 9.0 },
    { id: 2, title: "Demon Slayer", rating: 8.7 },
    { id: 3, title: "Jujutsu Kaisen", rating: 8.6 },
    { id: 4, title: "One Piece", rating: 8.9 },
  ];

  useEffect(()=>{
    if(!loading && user){
      router.replace("/(dashboard)/home")
    }else{
      alert("no user")
    }
  },[loading,user])

  if(!loading && user){
    return <Redirect href={"/(dashboard)/home"}/>
  }

  type ActionKey = "login" | "signup" | "trending"

  const actionRoutes: Record<ActionKey,"/(auth)/login" | "/(auth)/register" | "/trending"> = {
    login:"/(auth)/login",
    signup:"/(auth)/register",
    trending:"/trending"
  }

  
  return (
    <SafeAreaProvider>
      <View style={{ flex: 1, backgroundColor: "#000000" }}>
        <StatusBar barStyle="light-content" backgroundColor="#000000" />
        
        <LinearGradient
          colors={["#000000", "#1a0000"]}
          style={{ flex: 1 }}
        >
          <SafeAreaView edges={["top"]} style={{ flex: 1 }}>
            <ScrollView
              style={{ flex: 1 }}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 120 }}
            >
              <View style={{ paddingHorizontal: 24, paddingTop: 24, paddingBottom: 24 }}>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
                  <Header/>
                  <TouchableOpacity style={{ backgroundColor: "#1a1a1a", padding: 12, borderRadius: 999 }} activeOpacity={0.7}>
                    <Ionicons name="menu" size={24} color="#dc2626" />
                  </TouchableOpacity>
                </View>

                <Text style={{ color: "#ffffff", fontSize: 36, fontWeight: "bold", marginBottom: 8 }}>
                  Welcome,{"\n"}Anime Sensei!
                </Text>
                <Text style={{ color: "#9ca3af", fontSize: 16, marginBottom: 40 }}>
                  Join the ultimate anime community. Rate, review, and share your passion!
                </Text>

                <View style={{ flexDirection: "row", marginBottom: 40 }}>
                  <TouchableOpacity 
                    style={{ flex: 1, backgroundColor: "#dc2626", paddingVertical: 16, borderRadius: 16, marginRight: 12 }}
                    activeOpacity={0.8}
                    onPress={() => router.push("/(auth)/register")}
                  >
                    <Text style={{ color: "#ffffff", textAlign: "center", fontWeight: "bold", fontSize: 18 }}>
                      Start Your Journey
                    </Text>
                    <Text style={{ color: "rgba(255,255,255,0.8)", textAlign: "center", fontSize: 12, marginTop: 4 }}>
                      Sign Up
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={{ flex: 1, backgroundColor: "transparent", borderWidth: 2, borderColor: "#dc2626", paddingVertical: 16, borderRadius: 16 }}
                    activeOpacity={0.8}
                    onPress={() => router.push("/(auth)/login")}
                  >
                    <Text style={{ color: "#dc2626", textAlign: "center", fontWeight: "bold", fontSize: 18 }}>
                      Enter the Dojo
                    </Text>
                    <Text style={{ color: "rgba(220, 38, 38, 0.8)", textAlign: "center", fontSize: 12, marginTop: 4 }}>
                      Login
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={{ paddingHorizontal: 24, marginBottom: 32 }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                  <Text style={{ color: "#ffffff", fontSize: 24, fontWeight: "bold" }}>🔥 Trending Now</Text>
                  <TouchableOpacity activeOpacity={0.7}>
                    <Text style={{ color: "#dc2626", fontWeight: "600" }}>See All</Text>
                  </TouchableOpacity>
                </View>

                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 24 }}>
                  {featuredAnime.map((anime) => (
                    <TouchableOpacity
                      key={anime.id}
                      style={{ width: 160, backgroundColor: "#1a1a1a", borderRadius: 16, overflow: "hidden", marginRight: 16 }}
                      activeOpacity={0.8}
                    >
                      <View style={{ height: 128, backgroundColor: "#450a0a", alignItems: "center", justifyContent: "center", padding: 8 }}>
                        <Text style={{ color: "#ffffff", fontSize: 18, fontWeight: "bold", textAlign: "center" }}>
                          {anime.title}
                        </Text>
                      </View>
                      <View style={{ padding: 16 }}>
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                          <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Ionicons name="star" size={16} color="#fbbf24" />
                            <Text style={{ color: "#ffffff", fontWeight: "bold", marginLeft: 4 }}>{anime.rating}</Text>
                          </View>
                          <TouchableOpacity activeOpacity={0.7}>
                            <Ionicons name="heart-outline" size={20} color="#dc2626" />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>

              <View style={{ paddingHorizontal: 24, marginBottom: 40 }}>
                <Text style={{ color: "#ffffff", fontSize: 24, fontWeight: "bold", marginBottom: 24 }}>Community Stats</Text>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                  <View style={{ alignItems: "center", flex: 1 }}>
                    <Text style={{ color: "#dc2626", fontSize: 32, fontWeight: "bold" }}>1.2K</Text>
                    <Text style={{ color: "#9ca3af", fontSize: 14, marginTop: 4 }}>Active Otakus</Text>
                  </View>
                  <View style={{ height: 48, width: 1, backgroundColor: "#374151" }} />
                  <View style={{ alignItems: "center", flex: 1 }}>
                    <Text style={{ color: "#dc2626", fontSize: 32, fontWeight: "bold" }}>5.6K</Text>
                    <Text style={{ color: "#9ca3af", fontSize: 14, marginTop: 4 }}>Reviews</Text>
                  </View>
                  <View style={{ height: 48, width: 1, backgroundColor: "#374151" }} />
                  <View style={{ alignItems: "center", flex: 1 }}>
                    <Text style={{ color: "#dc2626", fontSize: 32, fontWeight: "bold" }}>892</Text>
                    <Text style={{ color: "#9ca3af", fontSize: 14, marginTop: 4 }}>Anime Listed</Text>
                  </View>
                </View>
              </View>

              <View style={{ paddingHorizontal: 24, paddingBottom: 40 }}>
                <Text style={{ color: "#ffffff", fontSize: 24, fontWeight: "bold", marginBottom: 24 }}>Quick Actions</Text>
                <View style={{ flexDirection: "row", flexWrap: "wrap", marginHorizontal: -8 }}>
                  {[
                    { icon: 'enter', label: 'Enter Dojo', subLabel: 'Login', action: 'login' },
                    { icon: 'person-add', label: 'Start Journey', subLabel: 'Sign Up', action: 'signup' },
                    { icon: 'trending-up', label: 'Trending', subLabel: 'Top Anime', action: 'trending' },
                  ].map((action, index) => (
                    <TouchableOpacity 
                      key={index} 
                      style={{ width: "33.33%", paddingHorizontal: 8, marginBottom: 16 }}
                      activeOpacity={0.8}
                      onPress={()=> router.push(actionRoutes[action.action as ActionKey])}
                    >
                      <View style={{ backgroundColor: "#1a1a1a", borderRadius: 16, padding: 16, alignItems: "center" }}>
                        <View style={{ width: 48, height: 48, backgroundColor: "rgba(220, 38, 38, 0.2)", borderRadius: 999, alignItems: "center", justifyContent: "center", marginBottom: 8 }}>
                          <Ionicons name={action.icon as any} size={24} color="#dc2626" />
                        </View>
                        <Text style={{ color: "#ffffff", fontWeight: "600", textAlign: "center", fontSize: 14 }}>
                          {action.label}
                        </Text>
                        <Text style={{ color: "#9ca3af", textAlign: "center", fontSize: 12, marginTop: 2 }}>
                          {action.subLabel}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </ScrollView>

            <View style={{ position: "absolute", bottom: 0, left: 0, right: 0, backgroundColor: "#0a0a0a", borderTopWidth: 1, borderTopColor: "#1f2937" }}>
              <SafeAreaView edges={["bottom"]}>
                <View style={{ paddingHorizontal: 24, paddingTop: 12, paddingBottom: 24 }}>
                  <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    {[
                      { icon: 'home', label: 'Home', active: true ,},
                      { icon: 'log-in', label: 'Login', active: false, action:"login" },
                      { icon: 'person-add', label: 'Sign Up', active: false, action:"signup" },
                      { icon: 'menu', label: 'Menu', active: false,  },
                    ].map((action, index) => (
                      <TouchableOpacity 
                        key={index} 
                        style={{ alignItems: "center" }}
                        activeOpacity={0.7}
                        onPress={()=>{
                          if(action.action){
                            router.push(actionRoutes[action.action as ActionKey]);
                          }
                        }}
                      >
                        <Ionicons 
                          name={action.icon as any} 
                          size={28} 
                          color={action.active ? '#dc2626' : '#666666'} 
                        />
                        <Text style={{ 
                          color: action.active ? '#dc2626' : '#9ca3af', 
                          fontSize: 12, 
                          marginTop: 4 
                        }}>
                          {action.label}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              </SafeAreaView>
            </View>
          </SafeAreaView>
        </LinearGradient>
      </View>
    </SafeAreaProvider>
  );
};

export default App;