import { Animated, Button, StyleSheet, Text, View, PanResponder, Dimensions, TouchableOpacity } from "react-native";
import React, { useRef, useState } from "react";

export default function SampleItem(props) {
    const [x, setX] = useState(-125)
    const dx = useRef(0)
    const t = useRef(0)
    const sample = props.sample

    function handleMove(event, gestureState) {
        dx.current = gestureState.dx - 125
        if (dx.current > 0 && dx.current <= 0)
            setX(dx.current)
        else if (dx.current < 0 && dx.current > -250)
            setX(dx.current)
    }

    function handleRelease() {
        t.current = dx.current + 125
        if (t.current < -100)
            setX(-250)
        else if (t.current > 100)
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

    function deleteHandler() {
        setX(-125)
        props.navigator.navigate("Delete sample", { sample: sample })
    }

    function updateHandler() {
        setX(-125)
        props.navigator.navigate("Update sample", { id: sample.id })
    }

    function detailsHandler() {
        setX(-125)
        props.navigator.navigate("Sample details", { sample: sample })
    }

    return (
        <Animated.View style={{ flexDirection: "row", transform: [{ translateX: x }], }}
            {...panResponder.panHandlers}>
            <View style={styles.deleteContainer}>
                <View style={styles.containerButton}>
                    <Button color={"red"} title={"Remove"} onPress={deleteHandler} />
                </View>
            </View>
            <View style={styles.itemContainer}>
                <Text style={styles.itemData} onPress={detailsHandler}>{props.itemText(sample)}</Text>
            </View>
            <View
                style={styles.updateContainer}>
                <View style={styles.containerButton}>
                    <Button
                        color={"blue"}
                        title={"Update"}
                        onPress={updateHandler}
                    />
                </View>
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
    updateContainer: {
        width: 125,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "blue"
    },
    containerButton: {
        flex: 1,
        width: 125,
        maxHeight: 32,
        overflow: "hidden",
        borderRadius: 12
    },
    itemData: {
        fontSize: 20
    }
});