import { Button, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Samples from "../Services/Samples/Samples"
import SplashScreen from "../Screens/SplashScreen"
import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import SampleItem from "../Components/Samples/SampleGestureItem"

export default function LocationDetails({ navigation, route }) {
    const location = route.params.location
    const [loading, setLoading] = useState(false)
    const samples = Samples.fromLocation(location.id)

    useFocusEffect(useCallback(() => {
        const needsFetch = !Samples.isFetched()
        setLoading(needsFetch)
        if (needsFetch)
            Samples.fetch().then(() => setLoading(false))
    }))

    if (loading)
        return (<SplashScreen />)

    function toItem({ item }) {
        return (
            <View key={item.id} style={styles.sampleContainer}>
                <TouchableOpacity onPress={() => navigation.navigate("Sample details", { sample: item })} style={styles.sampleMouseArea}>
                    <Text style={styles.sampleText}>{`${item.date} - ${item.time}`}</Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.tile}>
                <Text style={styles.label}>Location details</Text>
                <Text style={styles.name}>{location.name}</Text>
                <Text style={styles.town}>{location.town}</Text>
            </View>

            <View style={styles.tile}>
                <Text style={styles.label}>Notes</Text>
                <Text style={styles.notes}>{location.notes}</Text>
            </View>

            <View style={[styles.tile, styles.samplesTile]}>
                <Text style={styles.label}>Samples</Text>
                <Button onPress={() => navigation.navigate("Create sample", { location })} title="+" color={"green"}></Button>
                <FlatList data={samples} renderItem={({ item }) => <SampleItem navigator={navigation} sample={item} />} />
            </View>
        </View>
    )
}

const tileColor = "rgba(0, 0, 100, 0.1)"

const styles = StyleSheet.create({
    container: {
        padding: 8,
        rowGap: 8,
        flex: 1
    },
    tile: {
        backgroundColor: tileColor,
        padding: 8,
        borderRadius: 8
    },
    samplesTile: {
        flex: 1
    },
    sampleContainer: {
        borderRadius: 8,
        backgroundColor: "beige",
    },
    sampleMouseArea: {
        padding: 8,
        flexDirection: "row"
    },
    sampleText: {
        fontSize: 20
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
    },
    notes: {
        fontSize: 20
    }
})