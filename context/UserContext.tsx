import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getUserData } from "@/services/userServices";

interface UserContextType {
  profileImage: string | null;
  username: string | null;
  reloadUser: () => void;
}

const UserContext = createContext<UserContextType>({
  profileImage: null,
  username: null,
  reloadUser: () => {},
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const auth = getAuth();


  const loadUser = async (uid: string) => {
    try {
      const data = await getUserData(uid);
      setProfileImage(data.profileImage || null);
      setUsername(data.username || null);
    } catch (error) {
      console.error("Failed to load user:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) loadUser(user.uid);
    });
    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{ profileImage, username, reloadUser: () => auth.currentUser && loadUser(auth.currentUser.uid) }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
