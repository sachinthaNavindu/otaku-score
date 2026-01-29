import { auth } from "@/services/firebase"
import { onAuthStateChanged, User,signOut } from "firebase/auth"
import { createContext, ReactNode, useEffect, useState } from "react"

interface AuthContextType {
  user: User | null
  loading: boolean
  logout:() => Promise<void>
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);


export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true) 

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (usr) => {
      setUser(usr)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading,logout }}>
      {children}
    </AuthContext.Provider>
  )
}
