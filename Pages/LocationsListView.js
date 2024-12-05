import { FlatList, StyleSheet, View } from "react-native";
import sampleLocations from "../Services/Samples/SampleLocations"
import { useState } from "react";
import SplashScreen from "../Screens/SplashScreen"
import LocationItem from "../Components/sampleLocations/LocationItem"

export default function LocationsListView({ navigation }) {
    const needsFetch = !sampleLocations.isFetched()
    const [loading, setLoading] = useState(needsFetch)
    const locations = sampleLocations.all()

    if (needsFetch)
        sampleLocations.fetchLocations().then(() => setLoading(false))

    if (loading)
        return (<SplashScreen />)

    function toItem({item}){
        return (<LocationItem key={item.id} location={item} navigator={navigation}/>)
    }

    return (
        <View style={styles.container}>
            <FlatList data={locations} renderItem={toItem}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {

    }
})