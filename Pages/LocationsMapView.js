import { StyleSheet, View } from "react-native"
import MapView from 'react-native-maps'
import { useState } from "react"
import IconButton from "../Components/Controls/IconButton"
import { currentLocation } from '../Services/location/locations'
import Locations from "../Services/Samples/SampleLocations"
import MapMarker from "../Components/Map/MapMarker"

const initialCoords = {
    latitude: 55.640514005209646,
    longitude: 12.629873155214913,
    latitudeDelta: 0.75,
    longitudeDelta: 0.75
}

export default function LocationsMapView({ navigation }) {
    const [mapCords, setMapCoords] = useState(initialCoords)
    const locations = Locations.all()

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

    function toDetails(location) {
        navigation.navigate("Location details", { location })
    }

    return (
        <View style={styles.container}>
            <MapView region={mapCords} style={styles.map}>
                {locations.map(loc => (<MapMarker onPressed={toDetails} key={loc.id} item={loc} coordinates={loc.location}/>))}
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