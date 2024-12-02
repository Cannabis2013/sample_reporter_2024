
// https://www.npmjs.com/package/react-native-element-dropdown

import React, { useState } from 'react';
import { StyleSheet} from 'react-native';
import SampleTargets from "../../Services/Targets/StationsInfo"
import DropDown from "../Controls/DropDown"

export default function SampleTargetSelector(props){
    
    const targets = SampleTargets()
    const samples = targets.map(t => {
        return {
            label: t.name,
            value: t.id
        }
    })

    return (
        <DropDown data={samples} onChange={props.onUpdateValue}></DropDown>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 16,
        height: 96
    },
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
});