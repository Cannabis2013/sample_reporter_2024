import { StyleSheet, View } from "react-native"
import MapView from 'react-native-maps'
import { useState } from "react"
import IconButton from "../Components/Controls/IconButton"
import { currentLocation } from '../Services/location/locations'
import locations from "../Services/Samples/SampleLocations"
import SplashScreen from "../Screens/SplashScreen"
import MapMarker from "../Components/Map/MapMarker"

const initialCoords = {
    latitude: 55.640514005209646,
    longitude: 12.629873155214913,
    latitudeDelta: 0.75,
    longitudeDelta: 0.75
}

export default function LocationsMapView({ navigation }) {
    const needsFetching = !locations.isFetched()
    const [loading,setLoading] = useState(needsFetching)
    const [mapCords, setMapCoords] = useState(initialCoords)
    const locs = locations.all()

    if(needsFetching){
        locations.fetchLocations().then(() => setLoading(false))
        setTimeout(() => {
            setLoading(false)
        }, 2000);
    }

    async function goToCurrentLocation() {
        const cPos = await currentLocation()
        const coords = {
            latitude: cPos.latitude,
            longitude: cPos.longitude,
            latitudeDelta: 0.75,
            longitudeDelta: 0.75
        }
        setMapCoords({})
        setMapCoords(coords)
    }

    function mapMarkers(){
        return locs.map(loc => {
            return (
                <MapMarker key={loc.id} item={loc} coordinates={loc.location}></MapMarker>
            )
        })
    }

    if(loading){
        return (
            <SplashScreen/>
        )
    }

    return (
        <View style={styles.container}>
            <MapView region={mapCords} style={styles.map}>
                {mapMarkers()}
            </MapView>
            <IconButton style={styles.posWrapper} width={64}
                height={64}
                uri={require("../assets/cPos.png")}
                onPress={goToCurrentLocation}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    map: {
        width: "100%",
        height: "100%"
    },
    posWrapper: {
        position: "absolute",
        top: 20,
        left: 20,
        width: 64
    }
})