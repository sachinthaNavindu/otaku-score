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
  import { useLoader } from "@/hooks/useLoader";
  import { registerUser } from "@/services/authService";

  const Register = () => {
    const {showLoader,hideLoader,isLoading} = useLoader()
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleRegister = async()=>{
      if(isLoading){
          return
      }
      if(!username || !email || !password){
          Alert.alert("Fill All The Fields to Continue...")
          return
      }

      if(password !== confirmPassword){
          Alert.alert("password doesn't match...")
          return
      }
      try{
          showLoader()
          await registerUser(username,email,password)
          Alert.alert("Account Created..!",
              "Verify your email We sent a verification link to your email. Please verify before logging in"
          )
          router.push("/(auth)/login")
      }catch(error:any){
          Alert.alert("Registration Failed...",error.message)
          console.log(error)
      }finally{
          hideLoader()
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

                      <Header showBackButton={true} />
                      
                      <Text style={{ color: "#ffffff", fontSize: 36, fontWeight: "bold", marginBottom: 8 }}>
                        Start Your Journey
                      </Text>
                      <Text style={{ color: "#9ca3af", fontSize: 16, marginBottom: 40 }}>
                        Join our anime community today!
                      </Text>

                      <View style={{ marginBottom: 20 }}>
                        <Text style={{ color: "#ffffff", fontSize: 16, fontWeight: "600", marginBottom: 8 }}>
                          Username
                        </Text>
                        <View style={{ backgroundColor: "#1a1a1a", borderRadius: 12, paddingHorizontal: 16, paddingVertical: 14, flexDirection: "row", alignItems: "center" }}>
                          <Ionicons name="person-outline" size={20} color="#dc2626" />
                          <TextInput
                            style={{ flex: 1, color: "#ffffff", fontSize: 16, marginLeft: 12 }}
                            placeholder="Choose a username"
                            placeholderTextColor="#666666"
                            value={username}
                            onChangeText={setUsername}
                            selectionColor="#dc2626"
                            autoCapitalize="none"
                            autoCorrect={false}
                          />
                        </View>
                      </View>

                      <View style={{ marginBottom: 20 }}>
                        <Text style={{ color: "#ffffff", fontSize: 16, fontWeight: "600", marginBottom: 8 }}>
                          Email Address
                        </Text>
                        <View style={{ backgroundColor: "#1a1a1a", borderRadius: 12, paddingHorizontal: 16, paddingVertical: 14, flexDirection: "row", alignItems: "center" }}>
                          <Ionicons name="mail-outline" size={20} color="#dc2626" />
                          <TextInput
                            style={{ flex: 1, color: "#ffffff", fontSize: 16, marginLeft: 12 }}
                            placeholder="Enter your email"
                            placeholderTextColor="#666666"
                            value={email}
                            onChangeText={setEmail}
                            selectionColor="#dc2626"
                            autoCapitalize="none"
                            keyboardType="email-address"
                            autoComplete="email"
                          />
                        </View>
                      </View>

                      <View style={{ marginBottom: 20 }}>
                        <Text style={{ color: "#ffffff", fontSize: 16, fontWeight: "600", marginBottom: 8 }}>
                          Password
                        </Text>
                        <View style={{ backgroundColor: "#1a1a1a", borderRadius: 12, paddingHorizontal: 16, paddingVertical: 14, flexDirection: "row", alignItems: "center" }}>
                          <Ionicons name="lock-closed-outline" size={20} color="#dc2626" />
                          <TextInput
                            style={{ flex: 1, color: "#ffffff", fontSize: 16, marginLeft: 12 }}
                            placeholder="Create a strong password"
                            placeholderTextColor="#666666"
                            value={password}
                            onChangeText={setPassword}
                            selectionColor="#dc2626"
                            secureTextEntry={!showPassword}
                            autoComplete="password-new"
                          />
                          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                            <Ionicons 
                              name={showPassword ? "eye-off-outline" : "eye-outline"} 
                              size={20} 
                              color="#dc2626" 
                            />
                          </TouchableOpacity>
                        </View>
                        <Text style={{ color: "#6b7280", fontSize: 12, marginTop: 6 }}>
                          Use at least 8 characters with a mix of letters, numbers & symbols
                        </Text>
                      </View>

                      <View style={{ marginBottom: 32 }}>
                        <Text style={{ color: "#ffffff", fontSize: 16, fontWeight: "600", marginBottom: 8 }}>
                          Confirm Password
                        </Text>
                        <View style={{ backgroundColor: "#1a1a1a", borderRadius: 12, paddingHorizontal: 16, paddingVertical: 14, flexDirection: "row", alignItems: "center" }}>
                          <Ionicons name="lock-closed-outline" size={20} color="#dc2626" />
                          <TextInput
                            style={{ flex: 1, color: "#ffffff", fontSize: 16, marginLeft: 12 }}
                            placeholder="Re-enter your password"
                            placeholderTextColor="#666666"
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            selectionColor="#dc2626"
                            secureTextEntry={!showConfirmPassword}
                            autoComplete="password-new"
                          />
                          <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                            <Ionicons 
                              name={showConfirmPassword ? "eye-off-outline" : "eye-outline"} 
                              size={20} 
                              color="#dc2626" 
                            />
                          </TouchableOpacity>
                        </View>
                      </View>

                      <TouchableOpacity 
                          onPress={handleRegister}
                          disabled={isLoading}
                          style={{ 
                              backgroundColor: isLoading ? "#7f1d1d" : "#dc2626", 
                              paddingVertical: 18, 
                              borderRadius: 16,
                              marginBottom: 24,
                              shadowColor: "#dc2626",
                              shadowOffset: { width: 0, height: 4 },
                              shadowOpacity: 0.3,
                              shadowRadius: 8,
                              elevation: 8,
                              opacity: isLoading ? 0.7 : 1,
                          }}
                          activeOpacity={0.8}
                      >
                        <Text style={{ 
                          color: "#ffffff", 
                          textAlign: "center", 
                          fontWeight: "bold", 
                          fontSize: 18 
                        }}>
                          Begin Your Adventure
                        </Text>
                      </TouchableOpacity>

                      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 24 }}>
                        <View style={{ flex: 1, height: 1, backgroundColor: "#374151" }} />
                        <Text style={{ color: "#9ca3af", marginHorizontal: 16, fontSize: 14 }}>Or sign up with</Text>
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
                          Already have an account?{" "}
                        </Text>
                        <TouchableOpacity onPress={() => router.push("/(auth)/login")}>
                          <Text style={{ color: "#dc2626", fontSize: 16, fontWeight: "600" }}>
                            Enter the Dojo
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>

                    <View style={{ paddingHorizontal: 24, paddingTop: 32, paddingBottom: 40 }}>
                      <Text style={{ color: "#6b7280", fontSize: 12, textAlign: "center", lineHeight: 18 }}>
                        By creating an account, you agree to our{" "}
                        <TouchableOpacity>
                          <Text style={{ color: "#dc2626" }}>Terms of Service</Text>
                        </TouchableOpacity>{" "}
                        and{" "}
                        <TouchableOpacity>
                          <Text style={{ color: "#dc2626" }}>Privacy Policy</Text>
                        </TouchableOpacity>
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

  export default Register;