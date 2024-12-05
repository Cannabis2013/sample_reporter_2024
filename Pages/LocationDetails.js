import { StyleSheet, Text, View } from "react-native";
import Samples from "../Services/Samples/Samples"
import SplashScreen from "../Screens/SplashScreen"
import { useState } from "react";

export default function LocationDetails({ route }) {
    const location = route.params.location
    const needsFetch = !Samples.isFetched()
    const [loading, setLoading] = useState(needsFetch)
    const samples = Samples.fromLocation(location.id)
    const visible = samples.length > 0

    if (needsFetch)
        Samples.fetch().then(() => setLoading(false))

    if (loading)
        return (<SplashScreen />)

    function sampleText(sample){
        return `${sample.date} - ${sample.time}`
    }

    function sampleLabel(){
        return visible ? "Samples taken" : "No samples"
    }

    return (
        <View style={styles.container}>
            <View style={styles.tile}>
                <Text style={styles.label}>Location details</Text>
                <Text style={styles.name}>{location.name}</Text>
                <Text style={styles.town}>{location.town}</Text>
            </View>

            <View style={styles.tile}>
                <Text style={styles.label}>{sampleLabel()}</Text>
                {samples.map(sample => (
                    <Text key={sample.id}>{sampleText(sample)}</Text>))}
            </View>
        </View>
    )
}

const tileColor = "rgba(0, 0, 100, 0.1)"

const styles = StyleSheet.create({
    container: {
        padding: 8,
        rowGap: 8
    }, 
    tile: {
        backgroundColor: tileColor,
        padding: 8,
        borderRadius: 8
    },
    label: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 8
    },
    name: {
        fontSize: 24
    },
    town: {
        fontSize: 20
    }
})