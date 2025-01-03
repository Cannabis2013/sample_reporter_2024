import { getFirebaseApp } from "../../firebaseConfig";
import { collection, getDocs, getFirestore } from "@firebase/firestore";

const app = getFirebaseApp()
const db = getFirestore(app)
const collectionId = 'SampleTargets'
let sampleLocations = []
let fetched = false

async function _fetch(){
    const colRef = collection(db, collectionId)
        const snapshots = await getDocs(colRef)
        sampleLocations = []
        snapshots.forEach(doc => {
            const sampleLocation = doc.data()
            sampleLocation.id = doc.id
            sampleLocations.push(sampleLocation)
        })
        sampleLocations = sampleLocations.sort((loc1,loc2) => loc1.name >= loc2.name)
}

export default {
    isFetched(){
        return fetched
    },
    async fetch() {
        if(fetched)
            return
        await _fetch()
        fetched = true
    },
    async forceFetch(){
        await _fetch()
        fetched = true
    },
    all() {
        return sampleLocations
    },
    getById(id) {
        return sampleLocations.find(location => location.id == id)
    }
}