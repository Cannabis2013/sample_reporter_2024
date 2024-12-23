import { useState, useRef } from "react";
import { View, StyleSheet, Text, ActivityIndicator } from "react-native";

const messages = [
    "Loading... Please wait an hour.",
    "Loading... Maybe two hours",
    "Don't worry. Just Putin fucking with our connection.",
    "Ok. You might wan't to go get some tea or coffee!",
    "Are you running this app on a Nokia 3210 with Android running?"
]

let message
let nextIndex

export default function LoadPage(props) {
    const index = useRef(0)
    const [loadText, setLoadText] = useState(messages[0])
    const rotating = useRef(false)
    const loadTitle = props.title ? props.title : ""
    
    function rotateMessages(){
        if(!rotating.current)
            return
        setTimeout(() => {
            nextIndex = index.current + 1
            index.current =  nextIndex < messages.length ? nextIndex : 0
            message = messages[index.current]
            setLoadText(message)
            rotateMessages()
        }, 4000);
    }

    if(!rotating.current){
        rotating.current = true
        rotateMessages()
    }

    return (
        <View style={styles.container}>
            <Text>{loadTitle}</Text>
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