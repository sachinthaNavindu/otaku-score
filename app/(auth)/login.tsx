import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import Header from "@/components/Header";
import { login } from "@/services/authService";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async() =>{
    if(!email || !password){
      Alert.alert("Missing Fields","Please Fill Email/Username & Password")
      return
    }

    try{
      await login(email,password)
      Alert.alert("Welcome Back","Login Successful")
    }catch(error:any){
      Alert.alert("Login Failed",error.message)
    }
  } 

  return (
    <SafeAreaProvider>
      <KeyboardAvoidingView 
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
      >
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
                contentContainerStyle={{ 
                  flexGrow: 1,
                  paddingBottom: Platform.OS === "ios" ? 100 : 40 
                }}
                contentInsetAdjustmentBehavior="automatic"
                keyboardDismissMode="interactive"
                keyboardShouldPersistTaps="handled"
                bounces={false}
              >
                <View style={{ flex: 1, justifyContent: "center" }}>

                  <View style={{ paddingHorizontal: 24, paddingTop: 24, paddingBottom: 24 }}>

                    <Header />

                    <Text style={{ color: "#ffffff", fontSize: 36, fontWeight: "bold", marginBottom: 8 }}>
                      Enter the Dojo
                    </Text>
                    <Text style={{ color: "#9ca3af", fontSize: 16, marginBottom: 40 }}>
                      Log in to access your anime sanctuary
                    </Text>

                    <View style={{ marginBottom: 24 }}>
                      <Text style={{ color: "#ffffff", fontSize: 16, fontWeight: "600", marginBottom: 8 }}>
                        Email or Username
                      </Text>
                      <View style={{ backgroundColor: "#1a1a1a", borderRadius: 12, paddingHorizontal: 16, paddingVertical: 14, flexDirection: "row", alignItems: "center" }}>
                        <Ionicons name="mail-outline" size={20} color="#dc2626" />
                        <TextInput
                          style={{ flex: 1, color: "#ffffff", fontSize: 16, marginLeft: 12 }}
                          placeholder="Enter your email or username"
                          placeholderTextColor="#666666"
                          value={email}
                          onChangeText={setEmail}
                          selectionColor="#dc2626"
                          autoCapitalize="none"
                          keyboardType="email-address"
                          returnKeyType="next"
                        />
                      </View>
                    </View>

                    <View style={{ marginBottom: 32 }}>
                      <Text style={{ color: "#ffffff", fontSize: 16, fontWeight: "600", marginBottom: 8 }}>
                        Password
                      </Text>
                      <View style={{ backgroundColor: "#1a1a1a", borderRadius: 12, paddingHorizontal: 16, paddingVertical: 14, flexDirection: "row", alignItems: "center" }}>
                        <Ionicons name="lock-closed-outline" size={20} color="#dc2626" />
                        <TextInput
                          style={{ flex: 1, color: "#ffffff", fontSize: 16, marginLeft: 12 }}
                          placeholder="Enter your password"
                          placeholderTextColor="#666666"
                          value={password}
                          onChangeText={setPassword}
                          selectionColor="#dc2626"
                          secureTextEntry={!showPassword}
                          returnKeyType="done"
                        />
                        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                          <Ionicons 
                            name={showPassword ? "eye-off-outline" : "eye-outline"} 
                            size={20} 
                            color="#dc2626" 
                          />
                        </TouchableOpacity>
                      </View>
                      
                      <TouchableOpacity
                         style={{ alignSelf: "flex-end", marginTop: 8 }}
                         onPress={()=>router.push("/(auth)/forgotPassword")}
                      >
                        <Text style={{ color: "#dc2626", fontSize: 14 }}>
                          Forgot Password?
                        </Text>
                      </TouchableOpacity>
                    </View>

                    <TouchableOpacity 
                      onPress={handleLogin}
                      style={{ 
                        backgroundColor: "#dc2626", 
                        paddingVertical: 18, 
                        borderRadius: 16,
                        marginBottom: 24,
                        shadowColor: "#dc2626",
                        shadowOffset: { width: 0, height: 4 },
                        shadowOpacity: 0.3,
                        shadowRadius: 8,
                        elevation: 8,
                      }}
                      activeOpacity={0.8}
                    >
                      <Text style={{ 
                        color: "#ffffff", 
                        textAlign: "center", 
                        fontWeight: "bold", 
                        fontSize: 18 
                      }}>
                        Enter Dojo
                      </Text>
                    </TouchableOpacity>

                    <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 24 }}>
                      <View style={{ flex: 1, height: 1, backgroundColor: "#374151" }} />
                      <Text style={{ color: "#9ca3af", marginHorizontal: 16, fontSize: 14 }}>Or continue with</Text>
                      <View style={{ flex: 1, height: 1, backgroundColor: "#374151" }} />
                    </View>

                    <View style={{ flexDirection: "row", justifyContent: "center", gap: 16, marginBottom: 32 }}>
                      <TouchableOpacity 
                        style={{ width: 56, height: 56, backgroundColor: "#1a1a1a", borderRadius: 12, alignItems: "center", justifyContent: "center" }}
                        activeOpacity={0.7}
                      >
                        <Ionicons name="logo-google" size={24} color="#dc2626" />
                      </TouchableOpacity>
                      <TouchableOpacity 
                        style={{ width: 56, height: 56, backgroundColor: "#1a1a1a", borderRadius: 12, alignItems: "center", justifyContent: "center" }}
                        activeOpacity={0.7}
                      >
                        <Ionicons name="logo-facebook" size={24} color="#dc2626" />
                      </TouchableOpacity>
                      <TouchableOpacity 
                        style={{ width: 56, height: 56, backgroundColor: "#1a1a1a", borderRadius: 12, alignItems: "center", justifyContent: "center" }}
                        activeOpacity={0.7}
                      >
                        <Ionicons name="logo-twitter" size={24} color="#dc2626" />
                      </TouchableOpacity>
                    </View>

                    <View style={{ flexDirection: "row", justifyContent: "center" }}>
                      <Text style={{ color: "#9ca3af", fontSize: 16 }}>
                        Don't have an account?{" "}
                      </Text>
                      <TouchableOpacity
                        onPress={()=>router.push("/(auth)/register")}
                      >
                        <Text style={{ color: "#dc2626", fontSize: 16, fontWeight: "600" }}>
                          Start Your Journey
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View style={{ paddingHorizontal: 24, paddingTop: 32, paddingBottom: 40 }}>
                    <Text style={{ color: "#6b7280", fontSize: 12, textAlign: "center", lineHeight: 18 }}>
                      By logging in, you agree to our{" "}
                      <Text style={{ color: "#dc2626" }}>Terms of Service</Text>{" "}
                      and{" "}
                      <Text style={{ color: "#dc2626" }}>Privacy Policy</Text>
                    </Text>
                  </View>
                </View>
              </ScrollView>
            </SafeAreaView>
          </LinearGradient>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaProvider>
  );
};

export default Login;