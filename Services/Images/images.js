import * as ImagePicker from "expo-image-picker";
import { launchCameraAsync } from "expo-image-picker";
import { asBase64 } from "./imageFetch"

export async function pickImage() {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
    })
    if (result.canceled)
        return undefined
    return result.assets[0].uri
}

export async function launchCamera() {
    const result = await launchCameraAsync()
    if (result.canceled)
        return undefined
    return result.assets[0].uri
}
