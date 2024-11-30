import { StyleSheet, View, Image, Text } from "react-native"

const logoUri = require("../assets/notes-clipart.png")

export default function StartPage({ navigation }) {
    function navigateToSignIn() {
        navigation.navigate("SignIn")
    }

    function navigateToSignUp(){
        navigation.navigate("SignUp")
    }

    function homeBody() {
        return (
            <View style={styles.container}>
                <View style={styles.linkGroup}>
                    <Text onPress={navigateToSignIn} style={styles.link}>Sign in</Text>
                    <Text onPress={navigateToSignUp} style={styles.link}>Sign up</Text>
                </View>
                <Image style={styles.homeLogo} source={logoUri}></Image>
            </View>
        );
    }

    return homeBody();
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        rowGap: 12
    },
    loadingIndicator: {
    },
    homeText: {

    },
    linkGroup: {
        flexDirection: "row",
        columnGap: 12
    },
    link: {
        color: "blue",
        fontSize: 20,
        fontWeight: "bold"
    },
    homeLogo: {
        width: 192,
        height: 250
    }
})