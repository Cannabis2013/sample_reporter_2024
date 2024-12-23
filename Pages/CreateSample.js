import { Button, TextInput, View, StyleSheet, Text } from "react-native";
import { useState } from "react";
import ImageControls from "../Components/Images/ImageControls"
import { launchCamera, pickImage } from "../Services/Images/images";
import LoadPage from "./LoadPage"
import ImageGallary from "../Components/Images/ImageGallary"
import { userInfo } from "../Services/Auth/notesAuth";
import LocationSelector from "../Components/Samples/SampleLocationSelector"
import TypeSelector from "../Components/Samples/SampleTypeSelector";
import Samples from "../Services/Samples/Samples"

export default function CreateSample({ navigation, route }) {
    const [loading, setLoading] = useState(false)
    const [note, setNote] = useState("")
    const [location, setLocation] = useState(route?.params?.location ?? "")
    const [sampleType, setSampleType] = useState("")
    const [sampleValue, setSampleValue] = useState(0)
    const [images, setImages] = useState([])
    const [count, setCount] = useState(0)
    const limit = 250

    function createSample() {
        return {
            content: note,
            images,
            userId: userInfo().uid,
            location: location.id,
            value: sampleValue,
            type: sampleType,
            unit: "ppm"
        }
    }

    async function handleSaveClicked() {
        if (location === "")
            return
        setLoading(true)
        if (await Samples.save(createSample()))
            navigation.goBack()
        setLoading(false)
    }

    async function selectImage() {
        const imagePath = await pickImage()
        setLoading(true)
        if (imagePath) {
            images.push(imagePath)
            setImages(images)
        }
        setTimeout(() => {
            setLoading(false)
        }, 500);
    }

    async function captureImage() {
        const imagePath = await launchCamera()
        setLoading(true)
        if (imagePath) {
            images.push(imagePath)
            setImages(images)
        }
        setTimeout(() => {
            setLoading(false)
        }, 50);
    }

    function removeImage(image) {
        const filtered = images.filter(img => img.uri != image)
        setImages(filtered)
    }

    function updateNote(text){
        if(text.length > limit)
            return
        setNote(text)
        setCount(text.length)
    }

    if (loading)
        return (<LoadPage />)

    return (
        <View style={styles.container}>
            <View style={styles.controlTile}>
                <View style={styles.buttonGroup}>
                    <ImageControls onCapture={captureImage} onPick={selectImage}></ImageControls>
                    <Button title={"Gem"} onPress={handleSaveClicked}></Button>
                </View>
                <LocationSelector currentValue={location} style={styles.targetSelector} onUpdateValue={setLocation} />
            </View>
            <Text style={styles.wordCount}>{`${count}/${limit}`}</Text>
            <TextInput value={note} onChangeText={updateNote} multiline editable style={styles.note} placeholder={"Notes"} />
            <ImageGallary style={styles.gallary} images={images} onDelete={removeImage} />
            <TypeSelector style={styles.unitSelector} typeValue={sampleType} types={location.types} onValueChanged={setSampleValue} onTypeChanged={setSampleType}></TypeSelector>
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