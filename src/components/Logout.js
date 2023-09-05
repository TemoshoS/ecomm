import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const logout =()=>{
    signOut(auth)
    .then(()=>{

    }).catch((error)=>{
        console.error('Error signing out:', error)
    })
}