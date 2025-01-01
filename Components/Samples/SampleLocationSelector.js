
// https://www.npmjs.com/package/react-native-element-dropdown

import React, { useState} from 'react';
import DropDown from "../Controls/DropDown"
import { View } from 'react-native';
import SampleLocations from "../../Services/Samples/SampleLocations"
import LoadPage from "../../Pages/LoadPage"

function toItem(loc) {
    return {
        label: loc.name,
        value: loc.id
    }
}

export default function SampleTargetSelector(props) {
    const needsFetch = !SampleLocations.isFetched()
    const [loading,setLoading] = useState(needsFetch)
    const locations = SampleLocations.all()
    const items = locations.map(toItem)
    const currentValue = props.currentValue ?? undefined

    if(needsFetch)
        SampleLocations.fetch().then(() => setLoading(false))

    function handleChange(item){
        const location = locations.find(loc => loc.id == item.value)
        if(location && props.onUpdateValue)
            props.onUpdateValue(location.id)
    }

    if(loading)
        return (<LoadPage/>)

    return (
        <View style={[props.containerStyle, props.style]}>
            <DropDown value={currentValue} data={items} onChange={handleChange}></DropDown>
        </View>
    );
};