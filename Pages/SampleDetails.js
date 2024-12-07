import { StyleSheet, View, Text, Image } from "react-native";
import ImageGallary from "../Components/Images/ImageGallary"
import locations from "../Services/Samples/SampleLocations"
import SplashScreen from "../Screens/SplashScreen"
import { useState } from "react";
import { ScrollView } from "react-native";
import { translateOne} from "../Services/Samples/sampleTypes"

const clockLogoUri = require("../assets/clock.png")
const sampleLogoUri = require("../assets/sample-glass.png")

export default function SampleDetails({ route }) {
    const needsFetching = !locations.isFetched()
    const [loading, setLoading] = useState(needsFetching)
    const sample = route.params.sample
    const uris = sample.images.map(img => img.uri)
    const location = locations.targetByid(sample.location).name

    locations.fetchLocations().then(() => setLoading(false))

    if (loading)
        return (<SplashScreen />)

    return (
        <View style={styles.container}>
            <ScrollView >
                <View style={styles.tile}>
                    <Image style={styles.tileLogo} source={clockLogoUri} />
                    <Text style={{ fontSize: 24, fontWeight: "bold" }}>{`${sample.date} ${sample.time}`}</Text>
                </View>
                <View style={[styles.tile, styles.dateTile]}>
                    <Text style={styles.tileLabel}>Location</Text>
                    <Text style={{ fontSize: 32, fontWeight: "bold" }}>{location}</Text>
                </View>
                <View style={[styles.tile, styles.noteTile]}>
                    <Text style={styles.tileLabel}>Notes</Text>
                    <Text style={styles.noteContent}>{sample.content}</Text>
                </View>
                <View style={[styles.tile, styles.valueTitle]}>
                    <Image style={styles.tileLogo} source={sampleLogoUri} />
                    <Text style={styles.sampleValue}>{translateOne(sample.type)}</Text>
                    <Text style={styles.sampleValue} >
                        {`${sample.value} ${sample.unit}`}
                    </Text>
                </View>
                <View style={styles.tile}>
                    <ImageGallary images={uris} />
                </View>
            </ScrollView>
        </View >
    )
}

const tileColor = "rgba(0, 0, 100, 0.1)"

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        padding: 12
    },
    dateTile: {
        height: 140
    },
    tile: {
        width: "100%",
        padding: 8,
        borderRadius: 8,
        backgroundColor: tileColor,
        marginBottom: 8
    },
    noteTile: {
        height: 392
    },
    tileLabel: {
        fontWeight: "bold",
        fontSize: 28,
        marginBottom: 8
    },
    noteContent: {
        flex: 1,
        fontSize: 24
    },
    valueTitle: {
    },
    sampleValue: {
        fontSize: 32,
        fontWeight: "bold",
        textAlign: "center"
    },
    tileLogo: {
        width: 64,
        height: 64,
        alignSelf: "center"
    }
})
