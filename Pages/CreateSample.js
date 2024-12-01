import { Button, TextInput, View, StyleSheet } from "react-native";
import { useState } from "react";
import { launchCamera, pickImage } from "../Services/Camera/images";
import { saveNote } from "../Services/Persistence/DataPersistenceInterface"
import IconButton from "../Components/Controls/IconButton";
import { currentLocation } from "../Services/location/locations";
import SplashScreen from "../Screens/Splash"
import ImageGallary from "../Components/Images/ImageGallary"
import SampleMapView from "./SampleMapView"

export default function CreateSample({ navigation, route }) {
    const coords = route.params?.coords ?? undefined
    const [loading, setLoading] = useState(false)
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [showMap, setShowMap] = useState(false)
    const [location, setLocation] = useState(coords)
    const [images] = useState([])

    async function createSample() {
        const noteLocation = location ?? await currentLocation()
        return {
            title: title,
            content: content,
            latitude: noteLocation?.latitude ?? 0,
            longitude: noteLocation?.longitude ?? 0,
            images,
            userId : userInfo().uid
        }
    }

    async function handleSaveClicked() {
        setLoading(true)
        const notesObject = await createSample()
        if (await saveNote(notesObject))
            navigation.goBack()
        setLoading(false)
    }

    async function selectImage() {
        const result = await pickImage()
        setLoading(true)
        if (result)
            images.push(result)
        setLoading(false)
    }

    function handleMapPress(e) {
        setLocation(e.nativeEvent.coordinate)
        setShowMap(false)
    }

    async function captureImage() {
        const result = await launchCamera()
        setLoading(true)
        if (result)
            images.push(result)
        setLoading(false)
    }

    async function updateNoteLocation() {
        setLoading(true)
        const location = await currentLocation()
        if (location)
            setLocation(location)
        setLoading(false)
    }

    async function navigateToMapView() {
        setShowMap(true)
    }

    if (loading) {
        return (
            <SplashScreen />
        )
    }

    if (showMap) {
        return (
            <SampleMapView
                onLongPress={handleMapPress} nodeTitle={title}
                nodeContent={content} nodeLocation={location}
                onClose={() => setShowMap(false)} />
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.buttonGroup}>
                <View style={styles.buttonGroup2}>
                    <IconButton width={37} uri={require("../assets/camera.png")} onPress={captureImage} />
                    <IconButton width={37} uri={require("../assets/gallary.png")} onPress={selectImage} />
                    <IconButton width={20} uri={require("../assets/location.png")} onPress={updateNoteLocation} />
                    <IconButton width={30} uri={require("../assets/map.png")} onPress={navigateToMapView} />
                </View>
                <Button title={"Gem"} onPress={handleSaveClicked}></Button>
            </View>
            <TextInput value={title} onChangeText={setTitle} style={styles.titleInput} placeholder={"Title"} />
            <TextInput value={content} onChangeText={setContent} multiline editable style={styles.contentInput} placeholder={"Content"} />
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