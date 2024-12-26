import { Button, TextInput, View, StyleSheet, Text } from "react-native";
import { useState, useRef } from "react";
import ImageControls from "../Components/Images/ImageControls"
import { launchCamera, pickImage } from "../Services/Images/images";
import LoadPage from "./LoadPage"
import ImageGallary from "../Components/Images/ImageGallary"
import LocationSelector from "../Components/Samples/SampleLocationSelector"
import TypeSelector from "../Components/Samples/SampleTypeSelector";
import SampleLocations from "../Services/Samples/SampleLocations"
import Samples from "../Services/Samples/Samples"

function createSampleObject(){
    return  {
        sample: {},
        setContent(content){
            this.sample.content = content
        },
        setType(type){
            this.sample.type = type
        },
        setUnit(unit){
            this.sample.unit = unit
        },
        setValue(value){
            this.sample.value = value
        },
        setLocation(location){
            this.sample.location = location.id
        }
    }
}

export default function UpdateSample({ navigation, route }) {
    const [loading, setLoading] = useState(false)
    const sampleObject = createSampleObject()
    sampleObject.sample = Samples.getById(route.params.id)
    const uris = sampleObject.sample.images.map(img => img.uri)
    const [count, setCount] = useState(sampleObject.sample.content.length)
    const location = SampleLocations.getById(sampleObject.sample.location)
    const limit = 250

    async function handleUpdateSample() {
    }

    async function selectImage() {
        const imagePath = await pickImage()
        setLoading(true)
        if (imagePath)
            sampleObject.images.push(imagePath)
        setTimeout(() => {
            setLoading(false)
        }, 500);
    }

    async function captureImage() {
        const imagePath = await launchCamera()
        setLoading(true)
        if (imagePath)
            sampleObject.images.push(imagePath)
        setTimeout(() => {
            setLoading(false)
        }, 50);
    }

    function removeImage(image) {
        setLoading(true)
        // Delete image from Firebase Storage
        sampleObject.sample.images = sampleObject.sample.images.filter(img => img.uri != image)
        setLoading(false)
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
                    onUpdateValue={sampleObject.setLocation}
                />
            </View>
            <Text style={styles.wordCount}>{`${count}/${limit}`}</Text>
            <TextInput
                value={sampleObject.sample.content}
                onChangeText={updateNote}
                multiline
                editable
                style={styles.note}
                placeholder={"Notes"}
            />
            <ImageGallary
                style={styles.gallary}
                images={uris}
                onDelete={removeImage}
            />
            <TypeSelector
                style={styles.unitSelector}
                sampleValue={sampleObject.sample.value}
                typeValue={sampleObject.sample.type}
                types={sampleObject.sample.location.types}
                onValueChanged={sampleObject.setValue}
                onTypeChanged={sampleObject.setType}
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