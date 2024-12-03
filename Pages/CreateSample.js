import { Button, TextInput, View, StyleSheet } from "react-native";
import { useState } from "react";
import { launchCamera, pickImage } from "../Services/Images/images";
import { save } from "../Services/Persistence/DataPersistenceInterface"
import IconButton from "../Components/Controls/IconButton";
import SplashScreen from "../Screens/Splash"
import ImageGallary from "../Components/Images/ImageGallary"
import SampleTargetSelector from "../Components/Samples/SampleTargetSelector"
import { userInfo } from "../Services/Auth/notesAuth";
import DropDown from "../Components/Controls/DropDown";
import UnitSelector from "../Components/Samples/UnitSelector";

const tileColor = "rgba(0, 0, 100, 0.1)"

export default function CreateSample({ navigation }) {
    const [loading, setLoading] = useState(false)
    const [content, setContent] = useState("")
    const [stationId, setStationId] = useState("")
    const [sampleType,setSampleType] = useState("")
    const [images, setImages] = useState([])

    function createSample() {
        return {
            content: content,
            images,
            userId: userInfo().uid,
            stationRef: stationId,
            type: sampleType,
            unit: "ppm"
        }
    }

    async function handleSaveClicked() {
        if (stationId === "")
            return
        setLoading(true)
        const notesObject = createSample()
        if (await save(notesObject))
            navigation.goBack()
        setLoading(false)
    }

    async function selectImage() {
        const imagePath = await pickImage()
        setLoading(true)
        if (imagePath) {
            images.push({ uri: imagePath })
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
            images.push({ uri: imagePath })
            setImages(images)
        }
        setTimeout(() => {
            setLoading(false)
        }, 50);
    }
    
    function removeImage(image){
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
                    <View style={styles.buttonGroup2}>
                        <IconButton width={37} uri={require("../assets/camera.png")} onPress={captureImage} />
                        <IconButton width={37} uri={require("../assets/gallary.png")} onPress={selectImage} />
                    </View>
                    <Button title={"Gem"} onPress={handleSaveClicked}></Button>
                </View>
                <SampleTargetSelector style={styles.targetSelector} onUpdateValue={setStationId} />
            </View>
            <TextInput value={content} onChangeText={setContent} multiline editable style={styles.contentInput} placeholder={"Notes"} />
            <ImageGallary style={styles.gallary} images={images} onDelete={removeImage}/>
            <UnitSelector style={styles.unitSelector} onUpdateValue={setSampleType}></UnitSelector>
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
    buttonGroup2: {
        flexDirection: "row",
        columnGap: 6
    },
    unitSelector: {
        backgroundColor: tileColor
    }
})