import { StyleSheet, View, Text } from "react-native";
import ImageGallary from "../Components/Images/ImageGallary"
import locations from "../Services/Samples/SampleLocations"
import SplashScreen from "../Screens/SplashScreen"
import { useState } from "react";

const tileColor = "rgba(0, 0, 100, 0.1)"

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
            <View style={[styles.tile, styles.dateTile]}>
                <Text style={styles.tileLabel}>Date, time and location</Text>
                <Text style={{ fontSize: 16 }}>Date: {sample.date}</Text>
                <Text style={{ fontSize: 16 }}>Time: {sample.time}</Text>
                <Text style={{ fontSize: 16 }}>Location: {location}</Text>
            </View>
            <View style={[styles.tile, styles.noteTile]}>
                <Text style={styles.tileLabel}>Notes</Text>
                <Text style={styles.noteContent}>{sample.content}</Text>
            </View>
            <ImageGallary images={uris} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        padding: 12,
        rowGap: 8
    },
    dateTile: {
        height: 140
    },
    tile: {
        width: "100%",
        padding: 8,
        borderRadius: 8,
        backgroundColor: tileColor,
    },
    noteTile: {
        flex: 1
    },
    tileLabel: {
        fontWeight: "bold",
        fontSize: 28,
        marginBottom: 8
    },
    noteContent: {
        flex: 1,
        fontSize: 24
    }
})
