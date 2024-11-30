import { TouchableOpacity } from "react-native";
import { FlatList, StyleSheet, Text, View, Image } from "react-native";

export default function ImageGallary(props) {
    let imageData = props.images ?? []
    const images = imageData.map(data => data.uri)
    const deleteHandler = props.onDelete
    function renderImage(item) {
        const image = item.item
        return (
            deleteHandler ?
                <View style={styles.imageBlock}>
                    <Image style={styles.image} source={{ uri: image }} width={96} height={96} />
                    <TouchableOpacity
                        style={styles.removeButton}>
                        onPress={() => deleteHandler(image.id)}
                        <Text style={styles.buttonText}>Remove</Text>
                    </TouchableOpacity>
                </View> :
                <View style={styles.imageBlock}>
                    <Image style={styles.image} source={{ uri: image }} />
                </View>
        )
    }

    return (
        <View style={styles.container}>
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
        padding: 3
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
        color: "white",
        backgroundColor: "darkred",
        width: 64,
        borderRadius: 2,
        alignSelf: "center"
    },
    buttonText: {
        color: "white",
        textAlign: "center"
    }
})