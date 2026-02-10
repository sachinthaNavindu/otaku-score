import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile,sendEmailVerification } from "firebase/auth";
import {  doc,setDoc} from "firebase/firestore";
import { auth, db } from "./firebase";


export const login = async(email:string,password:string)=>{
      return await signInWithEmailAndPassword(auth, email, password)
}

export const registerUser = async (
    username: string,
    email: string,
    password: string
) =>{
    
   try{
     const userCred = await createUserWithEmailAndPassword(auth,email,password)
    await updateProfile(userCred.user,{
        displayName: username,
        photoURL:""
    })

    await sendEmailVerification(userCred.user)

    setDoc(doc(db,"users",userCred.user.uid),{
        username:username.toLowerCase(),
        role:"",
        email,
        emailVerified:false,
        createdAt: new Date()
    })
    return userCred.user
   }catch(error:any){
    if(error.code === "auth/email-already-in-use"){
        throw new Error("Email Already In Use")
    }
    if(error.code === "auth/invalid-email"){
        throw new Error("Invalid Email Address")
    }
    throw new Error("Registration Failed")
   }
}

