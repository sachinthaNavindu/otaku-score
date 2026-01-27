import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile,sendEmailVerification } from "firebase/auth";
import { collection, doc, getDocs, query, updateDoc,setDoc, where } from "firebase/firestore";
import { auth, db } from "./firebase";


export const login = async(passwordOrUsername:string,password:string)=>{
    try{
        let emailtoUse = passwordOrUsername

        if(!passwordOrUsername.includes("@")){
            const userRef = collection(db,"users")
            const q = query(userRef,where("username","==",passwordOrUsername.toLowerCase()))
            const querySnapShot = await getDocs(q)

            if(querySnapShot.empty){
                throw new Error("User not found")
            }

            const userDoc = querySnapShot.docs[0].data()
            emailtoUse = userDoc.email

        }

        const userCredential = await signInWithEmailAndPassword(auth,emailtoUse,password)

        if(!userCredential.user.emailVerified){
            throw new Error("Please Verify Your Email Before Logging in")
        }

        return userCredential

    }catch(error:any){
        if (error.code === "auth/wrong-password") {
          throw new Error("Incorrect password");
        }
        if (error.code === "auth/user-not-found") {
            throw new Error("No user found with this email");
        }
            throw new Error(error.message || "Login failed");
    }
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

