import { StyleSheet, View } from "react-native";
import sampleLocations from "../Services/Samples/SampleLocations"
import { useState } from "react";
import SplashScreen from "../Screens/SplashScreen"
import LocationItem from "../Components/sampleLocations/LocationItem"

export default function LocationsListView({navigation}){
    const needsFetch = !sampleLocations.isFetched()
    const [loading, setLoading] = useState(needsFetch)
    const locations = sampleLocations.all()

    if(needsFetch){
        sampleLocations.fetchLocations().then(() => setLoading(false))
        setTimeout(() => {
            setLoading(false)
        }, 2000);
    }

    if(loading)
        return (<SplashScreen/>)

    return (
        <View style={styles.container}>
            {locations.map(loc => (<LocationItem key={loc.id} location={loc}/>))}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {

    }
})