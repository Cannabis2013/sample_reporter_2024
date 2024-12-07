
// https://www.npmjs.com/package/react-native-element-dropdown

import React, { useState} from 'react';
import DropDown from "../Controls/DropDown"
import { View } from 'react-native';

export default function SampleTargetSelector(props) {
    const locations = props.locations ?? []
    const items = locations.map(toItem)
    const currentValue = props.currentValue?.id ?? undefined

    function toItem(loc) {
        return {
            label: loc.name,
            value: loc.id
        }
    }

    function handleChange(value){
        const location = locations.find(loc => loc.id == value)
        if(location && props.onUpdateValue)
            props.onUpdateValue(location)
    }

    return (
        <View style={[props.containerStyle, props.style]}>
            <DropDown value={currentValue} data={items} onChange={handleChange}></DropDown>
        </View>
    );
};