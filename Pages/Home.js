import { StyleSheet, View } from "react-native";
import { signOut } from "../Services/Auth/auth-firebase";
import IconTile from "../Components/Controls/IconTile";
import { useState } from "react";
import SplashScreen from "../Screens/SplashScreen";
import Samples from "../Services/Samples/Samples"
import Locations from "../Services/Samples/SampleLocations"

const listLogoUri = require("../assets/hamburger.png")
const mapLogoUri = require("../assets/map-logo.png")
const signOutLogoUri = require("../assets/signout.png")
const syncLogoUri = require("../assets/sync-logo.png")

export default function HomePage({ navigation }) {
    const [loading, setLoading] = useState(true)

    function fetchData() {
        Locations.fetch().then(() => {
            Samples.fetch().then(
                () => setLoading(false)
            )
        })
    }

    if (loading) {
        fetchData()
        return (<SplashScreen />)
    }

    function handleFetchRequest(){
        setLoading(true)
        fetchData
    }

    function navigateTo(route) {
        navigation.navigate(route)
    }

    return (
        <View style={styles.container}>
            <View style={styles.innerContainer}>
                <View style={styles.collout}>
                    <IconTile title={"Locations"} imageUrl={listLogoUri} pressHandler={() => navigateTo("Locations list")} />
                    <IconTile title={"Locations"} imageUrl={mapLogoUri} pressHandler={() => navigateTo("Locations map")} />
                </View>
                <View style={styles.collout}>
                    <IconTile title={"Samples"} imageUrl={listLogoUri} pressHandler={() => navigateTo("Samples list")} />
                    <IconTile title={"Log ud"} imageUrl={signOutLogoUri} pressHandler={signOut} />
                </View>
                <IconTile title={"Sync"} imageUrl={syncLogoUri} pressHandler={handleFetchRequest} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center"
    },
    innerContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        rowGap: 2
    },
    collout: {
        flexDirection: "row",
        columnGap: 2
    }
})