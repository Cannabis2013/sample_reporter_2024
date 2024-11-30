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

export function init() {
    if (!auth) {
        auth = initializeAuth(app, {
            persistence: getReactNativePersistence(ReactNativeAsyncStorage)
        })
    }
}

export function onSignedInChanged(observer) {
    if (!auth)
        throw "Auth not initialized!"
    obs = observer
    auth.onAuthStateChanged(handleStateChange)
}

export async function signIn(email, password, onSuccess, onError) {
    const user = await signInWithEmailAndPassword(auth, email, password)
        .catch(onError)
    onSuccess(user)
}

export async function signOut() {
    await SignOut(auth)
}

export async function signUp(email, password, onSuccess, onError) {
    const user = await createUserWithEmailAndPassword(auth, email, password)
        .catch(onError)
    onSuccess(user)
}

export function signedIn(){
    return userInfo !== undefined
}

export function getUser(){
    return JSON.parse(JSON.stringify(userInfo))
}