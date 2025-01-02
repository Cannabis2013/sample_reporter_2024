import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirebaseApp } from "../../firebaseConfig"
import { signInWithEmailAndPassword } from "firebase/auth";
import { signOut as SignOut, createUserWithEmailAndPassword } from "firebase/auth";

const app = getFirebaseApp()

let auth = undefined
let userInfo = undefined

let obs

function handleStateChange(user){
    userInfo = user
    if(user)
        obs(true)
    else
        obs(false)
}

export default{
    init() {
        if (!auth) {
            auth = initializeAuth(app, {
                persistence: getReactNativePersistence(ReactNativeAsyncStorage)
            })
        }
    },
    onSignedInChanged(observer) {
        if (!auth)
            throw "Auth not initialized!"
        obs = observer
        auth.onAuthStateChanged(handleStateChange)
    },
    async signIn(email, password, onSuccess, onError) {
        const user = await signInWithEmailAndPassword(auth, email, password)
            .catch(onError)
        onSuccess(user)
    },
    async signOut() {
        await SignOut(auth)
    },
    
    async signUp(email, password, onSuccess, onError) {
        const user = await createUserWithEmailAndPassword(auth, email, password)
            .catch(onError)
        onSuccess(user)
    },
    signedIn(){
        return userInfo !== undefined
    },
    getUser(){
        return JSON.parse(JSON.stringify(userInfo))
    }
}