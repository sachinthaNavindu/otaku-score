import { auth } from "@/services/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { createContext, useEffect, useState, ReactNode } from "react";
import * as SecureStore from "expo-secure-store";

interface AuthContextType {
  user: User | null;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: false,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = await SecureStore.getItemAsync("userToken");
      if (token) {
        const unsubscribe = onAuthStateChanged(auth, (usr) => {
          setUser(usr);
          setLoading(false);
        });
        return unsubscribe; 
      } else {
        setUser(null);
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
