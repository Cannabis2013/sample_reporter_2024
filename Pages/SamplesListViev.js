import { Button, FlatList, StyleSheet, View } from "react-native";
import { useState, useCallback } from "react";
import Samples from "../Services/Samples/Samples"
import { useFocusEffect } from "@react-navigation/native";
import SampleItem from "../Components/Samples/SampleGestureItem"
import sampleLocations from "../Services/Samples/SampleLocations"
import SplashScreen from "../Screens/SplashScreen"

export default function SamplesListView({ navigation }) {
    const samples = Samples.getAll()
    const [loading, setLoading] = useState(false)

    useFocusEffect(useCallback(() => {
        const needsFetching = !sampleLocations.isFetched() || !Samples.isFetched()
        setLoading(needsFetching)
        Samples.fetch().then(status => {
            if (status && !sampleLocations.isFetched())
                sampleLocations.fetchLocations().then(() => setLoading(false))
            else if (status)
                setLoading(false)
        })
    }))

    if (loading)
        return (<SplashScreen />)

    return (
        <View style={styles.container}>
            <View style={styles.buttonLayout}>
                <Button title={"+"} color={"darkgreen"} onPress={() => navigation.navigate("Create sample")} />
            </View>
            <FlatList data={samples}renderItem={({item}) => <SampleItem sample={item} navigator={navigation} />} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonLayout: {
        width: "100%"
    },
    itemContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 6,
        backgroundColor: "beige",
        borderBottomWidth: 1
    },
    deleteButton: {
        flex: 1,
        maxWidth: 64,
        maxHeight: 32,
        overflow: "hidden",
        borderRadius: 12
    },
    item: {
        fontSize: 32
    }
});