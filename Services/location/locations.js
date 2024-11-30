import * as Location from 'expo-location';

async function requestPermission(){
    return await Location.requestForegroundPermissionsAsync()
        .catch(e => undefined)
}

function toLocation(response){
    return {
        latitude: response?.coords?.latitude ?? 0,
        longitude: response?.coords?.longitude ?? 0
    }
}

async function getCurrentPositionAsync(){
    return await Location.getCurrentPositionAsync({})
            .catch(e => {
                alert("Check your app permissions. Faield to load location.")
                return undefined
            })
        
}

export async function currentLocation() {
    const status = await requestPermission()
    const granted = status.granted
    if (!granted)
        return toLocation()
    const response = await getCurrentPositionAsync()
    return  toLocation(response)
}