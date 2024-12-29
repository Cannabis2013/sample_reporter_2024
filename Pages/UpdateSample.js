import { Button, TextInput, View, StyleSheet, Text } from "react-native";
import { useState } from "react";
import ImageControls from "../Components/Images/ImageControls"
import { launchCamera, pickImage } from "../Services/Images/images";
import LoadPage from "./LoadPage"
import ImageGallary from "../Components/Images/ImageGallary"
import LocationSelector from "../Components/Samples/SampleLocationSelector"
import TypeSelector from "../Components/Samples/SampleTypeSelector";
import SampleLocations from "../Services/Samples/SampleLocations"
import Samples from "../Services/Samples/Samples"

function createCopy(sample) {
    return {
        content: sample.content,
        images: sample.images,
        userId: sample.userId,
        location: location.id,
        value: sample.value,
        type: sample.type,
        unit: sample.unit
    }
}

export default function UpdateSample({ navigation, route }) {
    const [loading, setLoading] = useState(false)
    const sample = createCopy(Samples.getById(route.params.id))
    const [count, setCount] = useState(sample.content.length)
    const location = SampleLocations.getById(sample.location)
    const limit = 250

    async function handleUpdateSample() {
        setLoading(true)
        if (await Samples.update(sample))
            navigation.goBack()
        setLoading(false)
    }

    async function selectImage() {
        const imagePath = await pickImage()
        setLoading(true)
        if (imagePath)
            sample.images.push(imagePath)
        setTimeout(() => {
            setLoading(false)
        }, 500);
    }

    async function captureImage() {
        const imagePath = await launchCamera()
        setLoading(true)
        if (imagePath)
            sample.images.push(imagePath)
        setTimeout(() => {
            setLoading(false)
        }, 50);
    }

    function removeExistingImages(image) {
        setLoading(true)
        sampleObject.sample.images = sampleObject.sample.images.filter(img => img.uri != image)
        setLoading(false)
    }

    function updateSampleType(sampleType) {
        sample.type = sampleType.value
        sample.unit = sampleType.unit
    }

    function updateSampleValue(value) {
        this.sample.value = value
    }

    function updateLocation(location) {
        this.sample.location = location.id
    }

    function updateNote(text) {
        if (text.length > limit)
            return
        sampleObject.sample.content = text
        setCount(text.length)
    }

    if (loading)
        return (<LoadPage />)

    return (
        <View style={styles.container}>
            <View style={styles.controlTile}>
                <View style={styles.buttonGroup}>
                    <ImageControls onCapture={captureImage} onPick={selectImage} />
                    <Button title={"Gem"} onPress={handleUpdateSample} />
                </View>
                <LocationSelector
                    currentValue={location}
                    style={styles.targetSelector}
                    onUpdateValue={updateLocation}
                />
            </View>
            <Text style={styles.wordCount}>{`${count}/${limit}`}</Text>
            <TextInput
                value={sample.content}
                onChangeText={updateNote}
                multiline
                editable
                style={styles.note}
                placeholder={"Notes"}
            />
            <ImageGallary
                style={styles.gallary}
                images={sample.images.map(img => img.uri)}
                onDelete={removeExistingImages}
            />
            <ImageGallary
                style={styles.gallary}
                images={sample.images.map(img => img.uri)}
                onDelete={removeExistingImages}
            />
            <TypeSelector
                style={styles.unitSelector}
                sampleValue={sample.value}
                typeValue={sample.type}
                types={sample.location.types}
                onValueChanged={updateSampleValue}
                onTypeChanged={updateSampleType}
            />
        </View>
    )
}

const tileColor = "rgba(0, 0, 100, 0.1)"

const styles = StyleSheet.create({
    container: {
        flex: 1,
        rowGap: 8,
        backgroundColor: '#fff',
        padding: 12
    },
    gallary: {
        backgroundColor: tileColor,
        borderRadius: 8,
        padding: 8
    },
    wordCount: {
        textAlign: "right"
    },
    note: {
        marginTop: 2,
        width: "100%",
        borderRadius: 8,
        textAlignVertical: "top",
        backgroundColor: "white",
        flex: 1,
        fontSize: 16,
        backgroundColor: tileColor,
        padding: 16,
        fontSize: 32
    },
    controlTile: {
        borderRadius: 8,
        padding: 8,
        backgroundColor: tileColor,
        rowGap: 8
    },
    buttonGroup: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    unitSelector: {
        backgroundColor: tileColor
    }
})