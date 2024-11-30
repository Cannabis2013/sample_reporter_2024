import { Marker } from "react-native-maps";
import { Text } from "react-native";

let index = 0

export default function MapMarker(item, pressHandler) {
    const coordinates = {
        latitude: item.latitude,
        longitude: item.longitude
    }

    return (
        <Marker key={index++} onPress={() => pressHandler(item)} coordinate={coordinates}/>
    )
}