import { Button, StyleSheet, Text, View } from "react-native";
import { userInfo, signOut } from "../Services/Auth/notesAuth";
import { setNeedsFetching } from "../Services/Notes/NotesInterface";

function toDateString(epochAsString){
    const date = new Date(Number.parseInt(epochAsString))
    return date.toLocaleString()
}

function handleSignOutClicked(){
    setNeedsFetching(true)
    signOut()
}

export default function UserPage() {

    const user = userInfo()
    const lastLoginAt = toDateString(user.lastLoginAt)
    const createdAt = toDateString(user.createdAt)
    return (
        <View style={styles.container}>
            <View style={styles.textArea}>
                <Text style={styles.textItem}>Email: {user.email}</Text>
                <Text style={styles.textItem}>Last login: {lastLoginAt}</Text>
                <Text style={styles.textItem}>Account created at: {createdAt}</Text>
            </View>
            <Button onPress={handleSignOutClicked} title="Sign out"></Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        rowGap: 12,
        padding: 8
    },
    textArea:{
        flex: 1
    },
    textItem: {
        fontSize: 12,     
    },
    rowLayout: {
        flexDirection: "row"
    }
})