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

export default function CreateSample({ navigation }) {
    const [loading, setLoading] = useState(false)
    const [content, setContent] = useState("")
    const [stationId, setStationId] = useState("")
    const [images, setImages] = useState([])
    
    function createSample() {
        return {
            content: content,
            images,
            userId: userInfo().uid,
            stationRef: stationId
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
        }, 500);
    }

    function updateCurrentId(id) {
        setStationId(id)
    }

    if (loading) {
        return (
            <SplashScreen />
        )
    }

    return (
        <View style={styles.container}>
            <SampleTargetSelector containerStyle={styles.targetSelector} onUpdateValue={updateCurrentId} />
            <View style={styles.buttonGroup}>
                <View style={styles.buttonGroup2}>
                    <IconButton width={37} uri={require("../assets/camera.png")} onPress={captureImage} />
                    <IconButton width={37} uri={require("../assets/gallary.png")} onPress={selectImage} />
                </View>
                <Button title={"Gem"} onPress={handleSaveClicked}></Button>
            </View>
            <TextInput value={content} onChangeText={setContent} multiline editable style={styles.contentInput} placeholder={"Notes"} />
            <ImageGallary style={styles.gallary} images={images} />
            <View style={styles.inputContainer}>
                <TextInput style={styles.valueInput} placeholder="Enter value.."></TextInput>
                <View style={styles.unitSelector}>
                    <DropDown></DropDown>
                </View>
            </View>
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
    gallary:  {
        backgroundColor: "lightblue",
        borderRadius: 8
    },
    targetSelector: {
        marginBottom: 8
    },
    contentInput: {
        marginTop: 2,
        width: "100%",
        textAlignVertical: "top",
        backgroundColor: "white",
        flex: 1,
        fontSize: 16,
        backgroundColor: "lightblue",
        padding: 16,
        fontSize: 32
    },
    buttonGroup: {
        flexDirection: "row",
        justifyContent: "space-between",
        borderRadius: 8,
        backgroundColor: "lightblue",
        padding:8
    },
    buttonGroup2: {
        flexDirection: "row",
        columnGap: 6
    },
    inputContainer: {
        height: "min-content",
        flexDirection: "row",
        alignItems: "center",
        padding: 8,
        borderRadius: 8,
        backgroundColor: "lightblue"
    },
    valueInput: {
        flex: 1,
        fontSize: 32
    },
    unitSelector: {
        width: 128
    }
})