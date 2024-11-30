import { Image, View, TouchableOpacity } from "react-native";

export default function IconButton(props) {
    const iWidth = props.width ?? 30
    const iHeight = props.height ?? 30
    const pressHandler = props.onPress ?? function(){}
    return (
        <View>
            <TouchableOpacity onPress={pressHandler} >
                <Image style={{width: iWidth, height: iHeight}} source={props.uri}></Image>
            </TouchableOpacity>
        </View>
    )
}