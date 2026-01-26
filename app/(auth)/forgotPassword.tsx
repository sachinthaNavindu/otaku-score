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

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [step, setStep] = useState<"request" | "verify">("request");

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
                      {step === "request" ? "Recover Your Account" : "Reset Password"}
                    </Text>
                    <Text style={{ color: "#9ca3af", fontSize: 16, marginBottom: 40 }}>
                      {step === "request" 
                        ? "Enter your email to receive a verification code" 
                        : "Enter the verification code and set a new password"}
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
                          Request Code
                        </Text>
                      </View>
                      
                      <View style={{ width: 40, height: 1, backgroundColor: "#374151", marginHorizontal: 8 }} />
                      
                      <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
                        <View style={{ 
                          width: 32, 
                          height: 32, 
                          borderRadius: 16, 
                          backgroundColor: step === "verify" ? "#dc2626" : "#374151",
                          alignItems: "center", 
                          justifyContent: "center" 
                        }}>
                          <Text style={{ 
                            color: step === "verify" ? "#ffffff" : "#9ca3af", 
                            fontWeight: "bold", 
                            fontSize: 14 
                          }}>
                            2
                          </Text>
                        </View>
                        <Text style={{ 
                          color: step === "verify" ? "#ffffff" : "#9ca3af", 
                          marginLeft: 8, 
                          fontSize: 14, 
                          fontWeight: "600" 
                        }}>
                          Reset Password
                        </Text>
                      </View>
                    </View>

                    {step === "request" && (
                      <>
                        <View style={{ marginBottom: 32 }}>
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
                            />
                          </View>
                          <Text style={{ color: "#6b7280", fontSize: 12, marginTop: 8 }}>
                            We'll send a 6-digit verification code to your email
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
                          onPress={() => setStep("verify")}
                        >
                          <Text style={{ 
                            color: "#ffffff", 
                            textAlign: "center", 
                            fontWeight: "bold", 
                            fontSize: 18 
                          }}>
                            Send Verification Code
                          </Text>
                        </TouchableOpacity>
                      </>
                    )}

                    {step === "verify" && (
                      <>
                        <View style={{ marginBottom: 24 }}>
                          <Text style={{ color: "#ffffff", fontSize: 16, fontWeight: "600", marginBottom: 8 }}>
                            Verification Code
                          </Text>
                          <View style={{ backgroundColor: "#1a1a1a", borderRadius: 12, paddingHorizontal: 16, paddingVertical: 14, flexDirection: "row", alignItems: "center" }}>
                            <Ionicons name="key-outline" size={20} color="#dc2626" />
                            <TextInput
                              style={{ flex: 1, color: "#ffffff", fontSize: 16, marginLeft: 12 }}
                              placeholder="Enter 6-digit code"
                              placeholderTextColor="#666666"
                              value={verificationCode}
                              onChangeText={setVerificationCode}
                              selectionColor="#dc2626"
                              keyboardType="number-pad"
                              maxLength={6}
                            />
                          </View>
                          <Text style={{ color: "#6b7280", fontSize: 12, marginTop: 8 }}>
                            Check your email for the verification code
                          </Text>
                        </View>

                        <View style={{ marginBottom: 20 }}>
                          <Text style={{ color: "#ffffff", fontSize: 16, fontWeight: "600", marginBottom: 8 }}>
                            New Password
                          </Text>
                          <View style={{ backgroundColor: "#1a1a1a", borderRadius: 12, paddingHorizontal: 16, paddingVertical: 14, flexDirection: "row", alignItems: "center" }}>
                            <Ionicons name="lock-closed-outline" size={20} color="#dc2626" />
                            <TextInput
                              style={{ flex: 1, color: "#ffffff", fontSize: 16, marginLeft: 12 }}
                              placeholder="Enter new password"
                              placeholderTextColor="#666666"
                              value={newPassword}
                              onChangeText={setNewPassword}
                              selectionColor="#dc2626"
                              secureTextEntry={!showNewPassword}
                            />
                            <TouchableOpacity onPress={() => setShowNewPassword(!showNewPassword)}>
                              <Ionicons 
                                name={showNewPassword ? "eye-off-outline" : "eye-outline"} 
                                size={20} 
                                color="#dc2626" 
                              />
                            </TouchableOpacity>
                          </View>
                        </View>

                        <View style={{ marginBottom: 32 }}>
                          <Text style={{ color: "#ffffff", fontSize: 16, fontWeight: "600", marginBottom: 8 }}>
                            Confirm Password
                          </Text>
                          <View style={{ backgroundColor: "#1a1a1a", borderRadius: 12, paddingHorizontal: 16, paddingVertical: 14, flexDirection: "row", alignItems: "center" }}>
                            <Ionicons name="lock-closed-outline" size={20} color="#dc2626" />
                            <TextInput
                              style={{ flex: 1, color: "#ffffff", fontSize: 16, marginLeft: 12 }}
                              placeholder="Confirm new password"
                              placeholderTextColor="#666666"
                              value={confirmPassword}
                              onChangeText={setConfirmPassword}
                              selectionColor="#dc2626"
                              secureTextEntry={!showConfirmPassword}
                            />
                            <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                              <Ionicons 
                                name={showConfirmPassword ? "eye-off-outline" : "eye-outline"} 
                                size={20} 
                                color="#dc2626" 
                              />
                            </TouchableOpacity>
                          </View>
                          <Text style={{ color: "#6b7280", fontSize: 12, marginTop: 8 }}>
                            Passwords must match
                          </Text>
                        </View>

                        <TouchableOpacity 
                          style={{ 
                            backgroundColor: "#10b981", 
                            paddingVertical: 18, 
                            borderRadius: 16,
                            marginBottom: 24,
                            shadowColor: "#10b981",
                            shadowOffset: { width: 0, height: 4 },
                            shadowOpacity: 0.3,
                            shadowRadius: 8,
                            elevation: 8,
                          }}
                          activeOpacity={0.8}
                          onPress={() => {
                            router.push("/(auth)/login");
                          }}
                        >
                          <Text style={{ 
                            color: "#ffffff", 
                            textAlign: "center", 
                            fontWeight: "bold", 
                            fontSize: 18 
                          }}>
                            Reset Password
                          </Text>
                        </TouchableOpacity>

                        <View style={{ flexDirection: "row", justifyContent: "center", marginBottom: 32 }}>
                          <Text style={{ color: "#9ca3af", fontSize: 14 }}>
                            Didn't receive the code?{" "}
                          </Text>
                          <TouchableOpacity>
                            <Text style={{ color: "#dc2626", fontSize: 14, fontWeight: "600" }}>
                              Resend Code
                            </Text>
                          </TouchableOpacity>
                        </View>
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