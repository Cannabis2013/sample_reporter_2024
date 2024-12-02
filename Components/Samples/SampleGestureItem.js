import { Animated, Button, StyleSheet, Text, View, PanResponder, Dimensions } from "react-native";
import React, { useRef, useState } from "react";

export default function SampleItem(props) {
    const [x, setX] = useState(-125)
    const dx = useRef(0)
    const item = useRef(props.item)

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

    function formatTitle() {
        return "Sample"
    }

    function deleteHandler(){
        props.navigator.navigate("Delete note",{ note: item.current })
    }

    function detailsHandler(){
        props.navigator.navigate("Sample details", {note: item.current})
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
                <Text style={styles.itemTitle} onPress={detailsHandler}>{formatTitle()}</Text>
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
        borderBottomWidth: 1,
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
    itemTitle: {
        fontSize: 32
    }
});