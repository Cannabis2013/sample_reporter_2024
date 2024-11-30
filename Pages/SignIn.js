import { StyleSheet, View, Text, TextInput, Button } from "react-native";
import { useState } from "react";
import SplashScreen from "../Screens/Splash.js";
import {signIn } from "../Services/Auth/notesAuth.js";
import {authUsername, authPassword} from "../env/authEnv.js"

export default function LoginPage({ navigation }) {
    const [username, setUsername] = useState(authUsername)
    const [password, setPassword] = useState(authPassword)
    const [loading, setLoading] = useState(false)
    const [errorText, setErrorText] = useState("")

    function validInput() {
        if (username.isEmpty || password.isEmpty)
            return false
        return true
    }

    function handleLoginRequest() {
        if (!validInput())
            return
        setLoading(true)

        function onSuccess(user) {
            setLoading(false)
        }

        function onError(){
            // Handle error
            setTimeout(() => {
                setLoading(false)
                setErrorText("Wrong credentials!")
            }, 1500);
        }

        signIn(username, password, onSuccess, onError)
    }

    function splashScreen() {
        return (
            <SplashScreen />
        )
    }

    function loginBody() {
        return (
            <View style={styles.container}>
                <Text style={styles.introText}>Enter credentials</Text>
                <TextInput onChangeText={setUsername} placeholder="Mail/Username"></TextInput>
                <TextInput onChangeText={setPassword} secureTextEntry={true} placeholder="Password"
                    textContentType="password"></TextInput>
                <Button title="Ok" onPress={handleLoginRequest}></Button>
                <Text style={styles.errorText}>{errorText}</Text>
            </View>
        )
    }
    if (loading)
        return splashScreen();
    return loginBody();
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 8,
        justifyContent: "center"
    },
    introText: {
        fontSize: 24,
        fontWeight: "bold",
    },
    errorText: {
        marginTop: 12,
        color: "red",
        fontSize: 20,
        fontWeight: "bold"
    },
    acceptButton: {

    }
})