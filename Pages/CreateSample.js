import { Button, TextInput, View, StyleSheet } from "react-native";
import { useState } from "react";
import { launchCamera, pickImage } from "../Services/Images/images";
import { save } from "../Services/Persistence/DataPersistenceInterface"
import IconButton from "../Components/Controls/IconButton";
import SplashScreen from "../Screens/Splash"
import ImageGallary from "../Components/Images/ImageGallary"
import SampleTargetSelector from "../Components/Samples/SampleTargetSelector"
import { userInfo } from "../Services/Auth/notesAuth";

export default function CreateSample({ navigation }) {
    const [loading, setLoading] = useState(false)
    const [content, setContent] = useState("")
    const [images,setImages] = useState([])
    const [stationId, setStationId] = useState("")

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
        const result = await pickImage()
        setLoading(true)
        if (result){
            images.push({uri: result})
            setImages(images)
        }
        setTimeout(() => {
            setLoading(false)
        }, 500);
    }

    console.log(images)

    async function captureImage() {
        const imagePath = await launchCamera()
        setLoading(true)
        if (imagePath){
            images.push({uri: imagePath})
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
            <SampleTargetSelector onUpdateValue={updateCurrentId} />
            <View style={styles.buttonGroup}>
                <View style={styles.buttonGroup2}>
                    <IconButton width={37} uri={require("../assets/camera.png")} onPress={captureImage} />
                    <IconButton width={37} uri={require("../assets/gallary.png")} onPress={selectImage} />
                </View>
                <Button title={"Gem"} onPress={handleSaveClicked}></Button>
            </View>
            <TextInput value={content} onChangeText={setContent} multiline editable style={styles.contentInput} placeholder={"Notes"} />
            <ImageGallary images={images} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 12
    },
    titleInput: {
        width: "100%",
        backgroundColor: "white",
        fontSize: 24,
        fontWeight: "bold"
    },
    contentInput: {
        marginTop: 2,
        width: "100%",
        textAlignVertical: "top",
        backgroundColor: "white",
        flex: 1,
        fontSize: 16
    },
    buttonGroup: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    buttonGroup2: {
        flexDirection: "row",
        columnGap: 6
    }
})