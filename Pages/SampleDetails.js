import {StyleSheet, View, Text} from "react-native";
import ImageGallary from "../Components/Images/ImageGallary"

export default function SampleDetails({route}){
    const sample = route.params.sample
    const uris = sample.images.map(img => img.uri)
    
    return (
        <View style={styles.container}>
            <Text style={styles.noteTitle} >{sample.title}</Text>
            <Text style={styles.noteContent}>{sample.content}</Text>
            <ImageGallary images={uris}/>
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
