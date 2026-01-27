import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import Header from "@/components/Header";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/services/firebase";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState<"request" | "verify">("request");

  const handleSendVerificationCode = async()=>{
    if(!email){
      alert("Please Enter Your Email")
      return
    }

    try{
      await sendPasswordResetEmail(auth,email)
      alert("Password Reset Link Sent! Check Your Email")
      router.push("/(auth)/login")
    }catch(error:any){
      if (error.code === "auth/user-not-found") {
        alert("No account found with this email");
    } else if (error.code === "auth/invalid-email") {
        alert("Invalid email address");
    } else {
        alert("Failed to send reset email");
    }
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
                         Recover Your Account
                    </Text>
                    <Text style={{ color: "#9ca3af", fontSize: 16, marginBottom: 40 }}>
                         Enter your email to receive a link to reset your password
                    </Text>

                    <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 32 }}>
                      <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
                        <View style={{ 
                          width: 32, 
                          height: 32, 
                          borderRadius: 16, 
                          backgroundColor: step === "request" ? "#dc2626" : "#10b981",
                          alignItems: "center", 
                          justifyContent: "center" 
                        }}>
                          <Text style={{ color: "#ffffff", fontWeight: "bold", fontSize: 14 }}>1</Text>
                        </View>
                        <Text style={{ 
                          color: step === "request" ? "#ffffff" : "#9ca3af", 
                          marginLeft: 8, 
                          fontSize: 14, 
                          fontWeight: "600" 
                        }}>
                          Request Link
                        </Text>
                      </View>
                      
                      <View style={{ width: 40, height: 1, backgroundColor: "#374151", marginHorizontal: 8 }} />
                    </View>

                    {step === "request" && (
                      <>
                        <View style={{ marginBottom: 32 }}>
                          <Text style={{ color: "#ffffff", fontSize: 16, fontWeight: "600", marginBottom: 8 }}>
                            Email
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
                            />
                          </View>
                          <Text style={{ color: "#6b7280", fontSize: 12, marginTop: 8 }}>
                            We'll send a Link to your email to reset your password
                          </Text>
                        </View>

                        <TouchableOpacity 
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
                          onPress={handleSendVerificationCode}
                          
                        >
                          <Text style={{ 
                            color: "#ffffff", 
                            textAlign: "center", 
                            fontWeight: "bold", 
                            fontSize: 18 
                          }}>
                            Send Reset Link
                          </Text>
                        </TouchableOpacity>
                      </>
                    )}

                   
                    <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 16 }}>
                      <TouchableOpacity onPress={() => router.push("/(auth)/login")}>
                        <Text style={{ color: "#dc2626", fontSize: 16, fontWeight: "600" }}>
                          ← Back to Login
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View style={{ paddingHorizontal: 24, paddingTop: 32, paddingBottom: 40 }}>
                    <Text style={{ color: "#6b7280", fontSize: 12, textAlign: "center", lineHeight: 18 }}>
                      Having trouble? Contact our{" "}
                      <TouchableOpacity>
                        <Text style={{ color: "#dc2626" }}>support team</Text>
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

export default ForgotPassword;