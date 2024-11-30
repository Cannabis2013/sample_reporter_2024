import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { View, StyleSheet, Button } from 'react-native';

export default function SampleMapView(props) {
    const handleLongPress = props.onLongPress
    const noteLocation = props.location
    const noteTitle = props.nodeTitle ?? ""
    const noteContent = props.nodeContent ?? ""
    const closeHandler = props.onClose ?? function(){}

    initialCoords = { 
        latitude: 55.640514005209646,
        longitude: 12.629873155214913,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1
    }

    return (
        <View style={styles.container}>
            <Button title='Close' onPress={closeHandler}></Button>
            <MapView initialRegion={initialCoords} style={styles.map} onLongPress={handleLongPress}>
                {noteLocation ? <Marker
                    coordinate={noteLocation}
                    title={noteTitle}
                    description={noteContent}
                /> : null}
            </MapView>
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
    }
})