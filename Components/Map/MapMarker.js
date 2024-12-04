import { Marker } from "react-native-maps";

export default function MapMarker(props) {
    const item = props.item
    const coords = props.coordinates
    const coordinates = {
        latitude: coords.latitude,
        longitude: coords.longitude
    }

    const pressHandler = props.onPressed ?? function(item){}

    return (
        <Marker onPress={() => pressHandler(item)} coordinate={coordinates}/>
    )
}