import { Animated, Button, StyleSheet, Text, View, PanResponder, Dimensions } from "react-native";
import React, { useRef, useState } from "react";
import locations from "../../Services/Samples/SampleLocations"

export default function SampleItem(props) {
    const [x, setX] = useState(-125)
    const dx = useRef(0)
    const sample = props.sample

    function handleMove(event, gestureState) {
        dx.current = gestureState.dx - 125
        if (dx.current <= 0 && dx.current > -125)
            setX(dx.current)
    }

    function handleRelease() {
        if (dx.current >= -5)
            setX(0)
        else
            setX(-125)
    }

    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: () => true,
            onPanResponderMove: handleMove,
            onPanResponderRelease: handleRelease,
        }),
    ).current;

    function deleteHandler(){
        props.navigator.navigate("Delete note",{ sample: sample })
    }

    function detailsHandler(){
        props.navigator.navigate("Sample details", {sample: sample})
    }

    return (
        <Animated.View style={{ flexDirection: "row", transform: [{ translateX: x }], }}
            {...panResponder.panHandlers}>
            <View style={styles.deleteContainer}>
                <View style={styles.deleteButton}>
                    <Button color={"red"} title={"Slet"} onPress={deleteHandler} />
                </View>
            </View>
            <View style={styles.itemContainer}>
                <Text style={styles.itemData} onPress={detailsHandler}>{props.itemText(sample)}</Text>
            </View>
        </Animated.View>

    )
}

const sWidth = Dimensions.get("window").width

const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 6,
        backgroundColor: "beige",
        width: sWidth
    },
    deleteContainer: {
        width: 125,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "red"
    },
    deleteButton: {
        flex: 1,
        width: 64,
        maxHeight: 32,
        overflow: "hidden",
        borderRadius: 12
    },
    itemData: {
        fontSize: 20
    }
});