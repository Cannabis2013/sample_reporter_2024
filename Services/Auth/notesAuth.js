import * as FirebaseAuth from "./auth-firebase"

const authenticator = FirebaseAuth

export function initAuth() {
    authenticator.init()
}

export function onSignedInChanged(observer) {
    authenticator.onSignedInChanged(observer)
}

export async function signIn(email, password, onSuccess, onError) {
    await authenticator.signIn(email,password,onSuccess,onError)
}

export async function signOut() {
    authenticator.signOut()
}

export async function signUp(email, password, onSuccess, onError) {
    await authenticator.signUp(email,password, onSuccess,onError)
}

export function signedIn(){
    return authenticator.signedIn()
}

export function userInfo(){
    return authenticator.getUser()
}