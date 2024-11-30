import { Button, FlatList, StyleSheet, Text, View } from "react-native";
import { useState,useCallback } from "react";
import { getAllNotes, fetchNotes } from "../Services/Notes/NotesInterface";
import { signOut } from "../Services/Auth/notesAuth";
import { useFocusEffect } from "@react-navigation/native";
import NoteItem from "../Components/NoteItems/NoteGestureItem"

export default function SamplesListView({ navigation }) {
    const notesData = getAllNotes()
    const [fetchRequired, setFetchRequired] = useState(true)

    async function handleFetchError(e) {
        if (e.code == "permission-denied")
            await signOut()
    }

    useFocusEffect(useCallback(() => {
        fetchNotes().then(status => {
            if(status)
                setFetchRequired(!fetchRequired)
        }).catch(handleFetchError)
    }))

    return (
        <View style={styles.container}>
            <View style={styles.buttonLayout}>
                <Button title={"Create"} color={"green"} onPress={() => navigation.navigate("Create sample")} />
            </View>
            <FlatList id={"samplesListView"} style={styles.listView}
                data={notesData}
                renderItem={({ item }) => <NoteItem item={item} clickHandler={item => navigation.navigate("Sample details", {note: item})} deleteHandler={item => redirectTo("Delete note",{ note: item })} ></NoteItem>} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonLayout: {
        width: "100%"
    },
    listView: {
        width: "100%",
    },
    itemContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 6,
        backgroundColor: "beige",
        borderBottomWidth: 1
    },
    deleteButton: {
        flex: 1,
        maxWidth: 64,
        maxHeight: 32,
        overflow: "hidden",
        borderRadius: 12
    },
    item: {
        fontSize: 32
    }
});