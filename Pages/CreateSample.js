import { Button, TextInput, View, StyleSheet } from "react-native";
import { useState } from "react";
import ImageControls from "../Components/Images/ImageControls"
import { launchCamera, pickImage } from "../Services/Images/images";
import SplashScreen from "../Screens/SplashScreen"
import ImageGallary from "../Components/Images/ImageGallary"
import SampleTargetSelector from "../Components/Samples/SampleTargetSelector"
import { userInfo } from "../Services/Auth/notesAuth";
import UnitSelector from "../Components/Samples/UnitSelector";
import Samples from "../Services/Samples/Samples"

const tileColor = "rgba(0, 0, 100, 0.1)"

export default function CreateSample({ navigation }) {
    const [loading, setLoading] = useState(false)
    const [content, setContent] = useState("")
    const [stationId, setStationId] = useState("")
    const [sampleType, setSampleType] = useState("")
    const [sampleValue, setSampleValue] = useState(0)
    const [images, setImages] = useState([])

    function createSample() {
        return {
            content: content,
            date: new Date().getUTCDate(),
            images,
            userId: userInfo().uid,
            stationRef: stationId,
            value: sampleValue,
            type: sampleType,
            unit: "ppm"
        }
    }

    async function handleSaveClicked() {
        if (stationId === "")
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

    if (loading) {
        return (
            <SplashScreen />
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.controlTile}>
                <View style={styles.buttonGroup}>
                    <ImageControls onCapture={captureImage} onPick={selectImage}></ImageControls>
                    <Button title={"Gem"} onPress={handleSaveClicked}></Button>
                </View>
                <SampleTargetSelector style={styles.targetSelector} onUpdateValue={setStationId} />
            </View>
            <TextInput value={content} onChangeText={setContent} multiline editable style={styles.contentInput} placeholder={"Notes"} />
            <ImageGallary style={styles.gallary} images={images} onDelete={removeImage} />
            <UnitSelector style={styles.unitSelector} onValueChanged={setSampleValue} onTypeChanged={setSampleType}></UnitSelector>
        </View>
    )
}

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
    contentInput: {
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