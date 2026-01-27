
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
//@ts-ignore
import { initializeAuth, getReactNativePersistence } from "firebase/auth"
import AsyncStorage from "@react-native-async-storage/async-storage"

const firebaseConfig = {
  apiKey: "AIzaSyAxsynw7xR4xX4bbBvdH_5JSGdTU5Cn9yQ",
  authDomain: "otaku-score.firebaseapp.com",
  projectId: "otaku-score",
  storageBucket: "otaku-score.firebasestorage.app",
  messagingSenderId: "88551616828",
  appId: "1:88551616828:web:46746ce032a132576f6e39"
};
const app = initializeApp(firebaseConfig)


export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
})

export const db = getFirestore(app)