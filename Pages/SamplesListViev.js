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
        setLoading(true)
        Samples.fetch().then(() => setLoading(false))}))

    if (loading)
        return (<SplashScreen />)

    function itemTitle(item) {
        const location = sampleLocations.targetByid(item.location)
        return `${item.date} | ${location?.name ?? "Ukendt"}`
    }

    return (
        <View style={styles.container}>
            <View style={styles.buttonLayout}>
                <Button title={"+"} color={"darkgreen"} onPress={() => navigation.navigate("Create sample")} />
            </View>
            <FlatList
                data={samples}
                renderItem={({ item }) => <SampleItem sample={item} itemText={itemTitle} navigator={navigation} />}
                ItemSeparatorComponent={<View style={styles.listSeparator}></View>}
            />
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
    listSeparator: {
        height: 1,
        backgroundColor: "grey"
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