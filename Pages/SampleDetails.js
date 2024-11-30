import {StyleSheet, View, Text} from "react-native";
import ImageGallary from "../Components/Images/ImageGallary"

export default function SampleDetails({route}){
    const note = route.params.note
    
    return (
        <View style={styles.container}>
            <Text style={styles.noteTitle} >{note.title}</Text>
            <Text style={styles.noteContent}>{note.content}</Text>
            <ImageGallary images={note.images}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        padding: 12
    },
    noteTitle: {
        fontSize: 24,
        borderBottomWidth: 1,
        marginBottom: 6
    },
    noteContent: {
        flex: 1
    },
    imageLogo: {
        position: "absolute",
        left: 20,
        top: 150
    },
    imageGroup: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        width: "100%"
    }
})
