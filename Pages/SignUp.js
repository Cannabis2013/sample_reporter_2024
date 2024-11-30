import { StyleSheet, View, TextInput, Button, Text } from "react-native";
import { signUp } from "../Services/Auth/notesAuth";
import { useState } from "react";
import SplashScreen from "../Screens/Splash"

export default function SignUpPage({ navigation }) {
    let email = ""
    let passwordOne = ""
    let passwordTwo = ""

    const [loading, setLoading] = useState(false)
    const [errorMsg, setErrorMsg] = useState("")

    function updateEmail(mail) {
        email = mail
    }

    function updatePasswordOne(pass) {
        passwordOne = pass
    }

    function updatePasswordTwo(pass) {
        if (String(passwordOne).includes(pass))
            passwordTwo = pass
    }

    function isValidEmail() {
        const re = /^[A-z0-9.]+@\w+.\w{2,}$/gm
        const regEx = new RegExp(re)
        const result = regEx.test(email)
        return result
    }

    function isValidPassword() {
        const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/gm
        const regEx = new RegExp(re)
        const result = regEx.test(passwordTwo)
        return result
    }

    function onSuccess(user) {
        setLoading(false)
        navigation.navigate("Notes")
    }

    function onError() {
        setLoading(false)
    }

    function createAndSignIn() {
        if (!isValidEmail()){
            setErrorMsg("Invalid e-mail!")
            return
        }
        if (passwordOne !== passwordTwo){
            setErrorMsg("Password must match!")
            return
        }
        if (!isValidPassword()){
            setErrorMsg("Invalid password!")
            return
        }
        setLoading(true)
        signUp(email, passwordTwo, onSuccess, onError)
    }

    function renderSplashScreen(){
        return (
            <SplashScreen/>
        )
    }

    function renderSignUpBody() {
        return (
            <View style={styles.container}>
                <TextInput onChangeText={updateEmail} placeholder="E-mail" />
                <TextInput onChangeText={updatePasswordOne} secureTextEntry={true} placeholder="Password" />
                <TextInput onChangeText={updatePasswordTwo} secureTextEntry={true} placeholder="Repeat password" />
                <Button onPress={createAndSignIn} title="Ok" />
                <Text style={styles.errorMessage}>{errorMsg}</Text>
            </View>
        )
    }
    
    return loading ? renderSplashScreen() : renderSignUpBody()
}

const styles = StyleSheet.create({
    container: {
        padding: 8,
        flex: 1,
        justifyContent: "center"
    },
    errorMessage: {
        color: "red",
        fontSize: 20
    }
})