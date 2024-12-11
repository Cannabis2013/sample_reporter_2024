import { TouchableOpacity } from "react-native";
import {Image} from "expo-image"
import { FlatList, StyleSheet, Text, View } from "react-native";
import { reload } from "firebase/auth";

export default function ImageGallary(props) {
    const images = props?.images ?? []
    const deleteHandler = props.onDelete

    function renderImage(item) {
        const image = item.item
        return (
            deleteHandler ?
                <View style={styles.imageBlock}>
                    <Image style={styles.image} source={{ uri: image }} width={96} height={96} />
                    <TouchableOpacity
                        style={styles.removeButton}
                        onPress={() => deleteHandler(image)}>
                        <Text style={styles.buttonText}>Remove</Text>
                    </TouchableOpacity>
                </View> :
                <View style={styles.imageBlock}>
                    <Image style={styles.image} source={{ uri: image }} />
                </View>
        )
    }

    if(images.length == 0)
        return null;

    return (
        <View style={[styles.container,props.style]}>
            <FlatList
                style={styles.listView}
                horizontal={true}
                data={images}
                renderItem={renderImage} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 96,
        width: "100%"
    },
    imageBlock: {
        flex: 1,
        width: 96,
        padding: 3,
        position: "relative"
    },
    image: {
        width: "100%",
        height: "100%",
        borderRadius: 6
    },
    listView: {
        columnGap: 2
    },
    removeButton: {
        position: "absolute",
        color: "white",
        backgroundColor: "darkred",
        width: 64,
        borderRadius: 2,
        alignSelf: "center",
        zIndex: 99
    },
    buttonText: {
        color: "white",
        textAlign: "center"
    }
})