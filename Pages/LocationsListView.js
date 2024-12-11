import { FlatList, StyleSheet, View } from "react-native";
import sampleLocations from "../Services/Samples/SampleLocations"
import SampleLocationItem from "../Components/Samples/SampleLocationItem"

export default function LocationsListView({ navigation }) {
    const locations = sampleLocations.all()

    return (
        <View style={styles.container}>
            <FlatList
                data={locations}
                renderItem={({item}) => <SampleLocationItem key={item.id} location={item} navigator={navigation} />}
                ItemSeparatorComponent={<View style={styles.listSeparator}></View>}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    listSeparator: {
        height: 1,
        backgroundColor: "gray"
    }
})