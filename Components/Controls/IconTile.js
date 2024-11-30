import { Image, View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";

export default function IconTile({ title, imageUrl, pressHandler }) {
    return (
        <View style={styles.tileContainer}>
            <TouchableOpacity onPress={pressHandler}>
                <Text style={styles.tileTitle}>
                    {title}
                </Text>
                <View style={styles.tileIconWrapper}>
                    <Image source={imageUrl ?? ""} style={styles.tileIcon}></Image>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    tileContainer: {
        padding: 8,
        width: 128,
        height: 128,
        backgroundColor: "rgba(0,0,180,0.3)"
    },
    tileTitle: {
        color: "black",
        fontWeight: "bold",
        fontSize: 20
    },
    tileIconWrapper: {
        height: 85,
        width: "100%",
        justifyContent: "center", 
        alignItems: "center"
    },
    tileIcon: {
        height: 70, 
        width: 70
    }
})