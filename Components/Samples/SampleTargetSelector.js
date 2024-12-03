
// https://www.npmjs.com/package/react-native-element-dropdown

import React from 'react';
import Targets from "../../Services/Targets/StationsInfo"
import DropDown from "../Controls/DropDown"
import { View } from 'react-native';

export default function SampleTargetSelector(props){
    
    const targets = Targets.all()
    const samples = targets.map(t => {
        return {
            label: t.name,
            value: t.id
        }
    })

    return (
        <View style={[props.containerStyle,props.style]}>
            <DropDown data={samples} onChange={props.onUpdateValue}></DropDown>
        </View>
    );
};