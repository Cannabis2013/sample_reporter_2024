const sampleTypes = [
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
        label: "Eucalytter",
        value: "euc"
    }
]

export function translateMany(types) {
    const translated = sampleTypes
        .filter(type => types.includes(type.value))
        .map(type => type.label)
}

export function translateOne(type){
    const found = sampleTypes.find(sampleType => sampleType.value == type)
    if(!found)
        return "Shit"
    return found.label
}