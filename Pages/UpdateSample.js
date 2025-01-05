import { Button, TextInput, View, StyleSheet, Text } from "react-native";
import { useState } from "react";
import ImageControls from "../Components/Images/ImageControls"
import { launchCamera, pickImage } from "../Services/Images/images";
import LoadPage from "./LoadPage"
import ImageGallary from "../Components/Images/ImageGallary"
import LocationSelector from "../Components/Samples/SampleLocationSelector"
import TypeSelector from "../Components/Samples/SampleTypeSelector"
import Samples from "../Services/Samples/Samples"
import Storage from "../Services/Persistence/StorageFirebase"

export default function UpdateSample({ navigation, route }) {
    const sample = Samples.getById(route.params.id)
    const sampleImages = sample.images
    const [loading, setLoading] = useState(false)
    const [note, setNote] = useState(sample.content)
    const [location, setLocation] = useState(sample.location)
    const [scrappedSaved, setScrappedSaved] = useState([]);
    const [capturedImages, setCapturedImages] = useState([]);
    const [sampleType, setSampleType] = useState(sample.type)
    const [sampleValue, setSampleValue] = useState(sample.value)
    const [count, setCount] = useState(sample.content.length)
    const limit = 250

    function createSample(sampleImages) {
        return {
            content: note,
            images: sampleImages,
            location: location,
            value: sampleValue,
            type: sampleType,
            unit: sampleType
        }
    }

    async function handleUpdateSample() {
        setLoading(true)
        await Storage.removeObjects(scrappedSaved)
        const images = await Storage.uploadObjects(capturedImages)
        const all = [...sampleImages, ...images]
        if (await Samples.update(sample.id, createSample(all)))
            navigation.goBack()
        setLoading(false)
    }

    async function selectImage() {
        const imagePath = await pickImage()
        setLoading(true)
        if (imagePath)
            setCapturedImages([...capturedImages, imagePath])
        setTimeout(() => {
            setLoading(false)
        }, 500);
    }

    async function captureImage() {
        const imagePath = await launchCamera()
        setLoading(true)
        if (imagePath)
            setCapturedImages([...capturedImages, imagePath])
        setTimeout(() => {
            setLoading(false)
        }, 50);
    }

    function scrapSaved(saved) {
        const imageId = sampleImages.find(img => img.url == saved)?.id ?? ""
        sampleImages = sampleImages.filter(img => img.id != imageId.id)
        setScrappedSaved([...scrapSaved, imageId])
    }

    function scrapCaptured(captured) {
        const filtered = capturedImages.filter(cap => cap != captured)
        setCapturedImages(filtered)
    }

    function updateNote(text) {
        setNote(text.length <= limit ? text : note)
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
                    onUpdateValue={setLocation}
                />
            </View>
            <Text style={styles.wordCount}>{`${count}/${limit}`}</Text>
            <TextInput
                value={note}
                onChangeText={updateNote}
                multiline
                editable
                style={styles.note}
                placeholder={"Notes"}
            />
            <ImageGallary
                style={styles.gallary}
                images={sampleImages.map(img => img.uri)}
                onDelete={scrapSaved}
            />
            <ImageGallary
                style={styles.gallary}
                images={capturedImages}
                onDelete={scrapCaptured}
            />
            <TypeSelector
                style={styles.unitSelector}
                sampleValue={sampleValue}
                typeValue={sampleType}
                types={sample.location.types}
                onValueChanged={setSampleValue}
                onTypeChanged={setSampleType}
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
        flex: 1,
        fontSize: 16,
        backgroundColor: tileColor,
        padding: 16,
        fontSize: 32,
        minHeight: 256
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