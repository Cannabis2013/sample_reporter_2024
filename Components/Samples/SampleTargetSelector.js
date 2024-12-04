
// https://www.npmjs.com/package/react-native-element-dropdown

import React, { useState, useCallback } from 'react';
import Locations from "../../Services/Samples/SampleLocations"
import DropDown from "../Controls/DropDown"
import { View } from 'react-native';

function toItem(t) {
    return {
        label: t.name,
        value: t.id
    }
}

export default function SampleTargetSelector(props) {
    const locations = Locations.all().map(toItem)
    const [change,updateChange] = useState(false)
    const currentValue = props.currentValue ?? undefined
    
    if (!Locations.isFetched()) {
        Locations.fetchLocations().then(() => updateChange(!change))
    }

    return (
        <View style={[props.containerStyle, props.style]}>
            <DropDown value={currentValue} data={locations} onChange={props.onUpdateValue}></DropDown>
        </View>
    );
};