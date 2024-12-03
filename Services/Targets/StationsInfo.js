import {v4 as uuid4} from "uuid"

const targets = [
    {
        name: "Bennys Kemikalier",
        town: "Måløv",
        location: {
            lng: 23,
            lat: 23
        },
        id: uuid4()
    },
    {
        name: "Brøndby Stadion",
        town: "Brøndby",
        location: {
            lng: 23,
            lat: 23
        },
        id: uuid4()
    },
    {
        name: "Toms Chocoladefabrik",
        town: "Ballerup",
        location: {
            lng: 23,
            lat: 23
        },
        id: uuid4()
    },
    {
        name: "Lufthavnen",
        town: "Kastrup",
        location: {
            lng: 23,
            lat: 23
        },
        id: uuid4()
    }
]

export default {
    all(){
        return targets
    },
    targetByid(id){
        return targets.find(t => t.id == id)
    }
}