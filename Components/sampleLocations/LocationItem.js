import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";

const imageUri = "../../assets/eurofins.png"

export default function LocationItem(props) {
    const location = props.location
    const name = location.name ?? ""
    const town = location.town ?? ""

    function locationTitle() {
        return `${name} (${town})`
    }

    function toDetails() {
        props.navigator.navigate("Location details", { location })
    }

    function pressHandler() {
        if (props.onPressed)
            props.onPressed(location)
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.touchable} onPress={toDetails}>
                <Image style={styles.locLogo} source={require(imageUri)} />
                <Text style={styles.locName}>{locationTitle()}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 48,
    },
    touchable: {
        width: "100%",
        height: "100%",
        alignItems: "center",
        backgroundColor: "beige",
        borderBottomWidth: 1,
        paddingHorizontal: 8,
        columnGap: 8,
        flexDirection: "row"
    },
    locLogo: {
        width: 32,
        height: 32
    },
    locName: {
        fontSize: 20
    }
})