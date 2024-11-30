import {Button, StyleSheet, Text, View} from "react-native";
import {removeNoteById} from "../Services/Notes/NotesInterface";

export default function DeleteSample({route,navigation}){
    const note = route.params.note
    
    const deleteNote = async () => {
        await removeNoteById(note.id)
        navigation.goBack()
    }
    
    return (
        <View style={styles.container}>
            <Text style={styles.confirmText}>Er du sikker på du vil slette "{note.title}"?</Text>
            <View style={styles.buttonWrapper}>
                <Button color={"red"} title={"Slet"} onPress={deleteNote}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: "space-between",
        padding: 12
    },
    confirmText: {
        fontSize: 32,
        textAlignVertical: "center"
    },
    buttonWrapper: {
        flex: 1,
        width: "100%",
        maxHeight: 32
    }
})