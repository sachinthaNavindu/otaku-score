import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider } from "@/context/AuthContext"; 

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: "#000000" },
          }}
        >
          {children}
        </Stack>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
