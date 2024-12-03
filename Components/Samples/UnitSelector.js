import { View, StyleSheet, TextInput } from "react-native";
import DropDown from "../Controls/DropDown";

const units = [
    {
        label: "CO2",
        value: "co2"
    },
    {
        label: "Ph",
        value: "ph"
    },
    {
        label: "Cyprioter",
        value: "cyp"
    },
    {
        label: "Eucalyptos",
        value: "euc"
    }
]

export default function UnitSelector(props) {
    const valueHandler = props.onValueChanged ?? function(item){}
    const typeHandler = props.onTypeChanged ?? function(item){}

    return (
        <View style={[styles.container, props.style]}>
            <TextInput style={styles.valueInput} onChangeText={valueHandler} placeholder="Enter value.."></TextInput>
            <View style={styles.unitSelector}>
                <DropDown data={units} onChange={typeHandler}></DropDown>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: "min-content",
        flexDirection: "row",
        alignItems: "center",
        padding: 8,
        borderRadius: 8,
    },
    valueInput: {
        flex: 1,
        fontSize: 32
    },
    unitSelector: {
        width: 128
    }
})