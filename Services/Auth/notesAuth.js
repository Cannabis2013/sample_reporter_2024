import FirebaseAuth from "./auth-firebase"

const authenticator = FirebaseAuth

export default{
    initAuth() {
        authenticator.init()
    },
    onSignedInChanged(observer) {
        authenticator.onSignedInChanged(observer)
    },
    async signIn(email, password, onSuccess, onError) {
        await authenticator.signIn(email,password,onSuccess,onError)
    },
    async signOut() {
        authenticator.signOut()
    },
    async signUp(email, password, onSuccess, onError) {
        await authenticator.signUp(email,password, onSuccess,onError)
    },
    signedIn(){
        return authenticator.signedIn()
    },
    userInfo(){
        return authenticator.getUser()
    }
}