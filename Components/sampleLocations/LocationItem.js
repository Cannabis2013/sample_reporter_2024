import { Text, View, StyleSheet } from "react-native";


export default function LocationItem(props){
    const location = props.location
    const name = location.name ?? ""
    const town = location.town ?? ""

    function locationTitle(){
        return `${name} (${town})`
    }

    return (
        <View style={styles.container}>
            <Text style={styles.locName}>{locationTitle()}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "beige",
        borderBottomWidth: 1,
        height: 48,
        paddingHorizontal: 8,
        columnGap: 8
    },
    locName: {
        fontSize: 20
    }
})