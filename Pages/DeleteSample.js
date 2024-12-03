import {Button, StyleSheet, Text, View} from "react-native";
import {remove} from "../Services/Persistence/DataPersistenceInterface"
import { useState } from "react";
import SplashScreen from "../Screens/Splash"

export default function DeleteSample({route,navigation}){
    const [loading, setLoading] = useState(false)
    const sample = route.params.sample
    
    const deleteSample = async () => {
        setLoading(true)
        await remove(sample)
        navigation.goBack()
    }

    if(loading){
        return (
            <SplashScreen/>
        )
    }
    
    return (
        <View style={styles.container}>
            <Text style={styles.confirmText}>Er du sikker på du vil slette "{sample.title}"?</Text>
            <View style={styles.buttonWrapper}>
                <Button color={"red"} title={"Slet"} onPress={deleteSample}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: "space-between",
        padding: 12
    },
    confirmText: {
        fontSize: 32,
        textAlignVertical: "center"
    },
    buttonWrapper: {
        flex: 1,
        width: "100%",
        maxHeight: 32
    }
})