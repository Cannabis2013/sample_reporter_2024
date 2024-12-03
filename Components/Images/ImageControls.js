import { StyleSheet, View } from "react-native"
import IconButton from "../Controls/IconButton";

export default function ImageControls(props) {
    const captureImage = props.onCapture ?? function(){}
    const selectImage = props.onPick ?? function(){}
    
    return (
        <View style={styles.container}>
            <IconButton width={37} uri={require("../../assets/camera.png")} onPress={captureImage} />
            <IconButton width={37} uri={require("../../assets/gallary.png")} onPress={selectImage} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        columnGap: 6
    }
})