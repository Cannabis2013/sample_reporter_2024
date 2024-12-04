import { getFirebaseApp } from "../../firebaseConfig";
import { collection, getDocs, getFirestore } from "@firebase/firestore";

const app = getFirebaseApp()
const db = getFirestore(app)

const collectionId = 'SampleTargets'

let sampleLocations = []

let fetched = false

export default {
    isFetched(){
        return fetched
    },
    async fetchLocations() {
        const colRef = collection(db, collectionId)
        const snapshots = await getDocs(colRef)
        snapshots.forEach(doc => {
            const sampleLocation = doc.data()
            sampleLocation.id = doc.id
            sampleLocations.push(sampleLocation)
        })
        fetched = true
    },
    all() {
        return sampleLocations

    },
    targetByid(id) {
        return sampleLocations.find(location => location.id == id)
    }
}