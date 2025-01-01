import { Button, StyleSheet, Text, View } from "react-native";
import Samples from "../Services/Samples/Samples"
import { useState } from "react";
import LoadPage from "./LoadPage"
import Storage from "../Services/Persistence/StorageFirebase";

export default function DeleteSample({ route, navigation }) {
    const [loading, setLoading] = useState(false)
    const sample = route.params.sample

    async function deleteSample() {
        setLoading(true)
        const imageIds = sample.images.map(img => img.imageId)
        await Storage.removeObjects(imageIds)
        await Samples.remove(sample)
        navigation.goBack()
    }

    if (loading) {
        return (
            <LoadPage />
        )
    }

    return (
        <View style={styles.container}>
            <Text style={styles.confirmText}>Er du sikker på du vil slette "{sample.title}"?</Text>
            <View style={styles.buttonWrapper}>
                <Button color={"red"} title={"Slet"} onPress={deleteSample} />
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