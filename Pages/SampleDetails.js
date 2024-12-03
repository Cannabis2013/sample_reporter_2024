import {StyleSheet, View, Text} from "react-native";
import ImageGallary from "../Components/Images/ImageGallary"

export default function SampleDetails({route}){
    const sample = route.params.sample
    const uris = sample.images.map(img => img.uri)
    
    return (
        <View style={styles.container}>
            <Text style={styles.content}>{sample.content}</Text>
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
    content: {
        flex: 1,
        fontSize: 32
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
