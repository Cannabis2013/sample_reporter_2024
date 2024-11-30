import { useState } from "react";
import { View, StyleSheet, Text, ActivityIndicator } from "react-native";

let fiveSecondsMark = false
let eightSecondsMark = false


export default function SplashScreen() {
    const [loadText, setLoadText] = useState("Loading... Please wait an hour.")
    function showFiveSecondsMessage(){
        setTimeout(() => {
            setLoadText("Don't worry. Just Putin fucking with our connection.")
            fiveSecondsMark = true
        }, 5000);
    }

    function showEightSecondsMessage(){
        setTimeout(() => {
            setLoadText("Ok. You might wan't to go get some tea or coffee!")
            eightSecondsMark = true
        }, 8000)
    }
    
    if (!fiveSecondsMark)
        showFiveSecondsMessage()

    if(!eightSecondsMark)
        showEightSecondsMessage()

    return (
        <View style={styles.container}>
            <Text style={styles.splashText}>{loadText}</Text>
            <ActivityIndicator size={"large"} />
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        rowGap: 12
    },
    splashText: {
        fontSize: 24
    }
})