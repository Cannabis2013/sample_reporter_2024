import "firebase/compat/storage"
import { initializeApp } from "firebase/app";
import * as Env from "./env/firebaseEnv";
import { getStorage } from "@firebase/storage";
let app = undefined

export function getFirebaseApp () {
    if (app)
        return app
    const firebaseConfig = {
        apiKey: Env.firebaseApiKey,
        authDomain: Env.firebaseAuthDomain,
        projectId: Env.firebasePID,
        storageBucket: Env.firebaseBucket,
        messagingSenderId: Env.firebaseMsgId,
        appId: Env.firebaseAppId
    };
    app = initializeApp(firebaseConfig);
    return app
}

export function getStorageReference(){
    const app = getFirebaseApp()
    return getStorage(app)
}