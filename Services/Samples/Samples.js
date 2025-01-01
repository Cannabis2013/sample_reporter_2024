//import * as LocalNotes from "./NotesJsonFileStorage"
import FirebaseProvider from "../Persistence/DbFirestore"
import { getCurrentDate, getCurrentTime } from "../../Utils/date"

const PersistenceProvider = FirebaseProvider

PersistenceProvider.collectionId = 'Samples'

let samples = []
let fetchingRequired = true
const timeoutLimit = 3000
const timeoutMessage = "Timeout occured"

export default {
    isFetched() {
        return !fetchingRequired
    },
    setNeedsFetching(status) {
        fetchingRequired = status
    },
    getAll() {
        return samples
    },
    getById(id){
        return samples.find(s => s.id == id)
    },
    fromLocation(locationId){
        return samples.filter(item => item.location == locationId)
    },
    async fetch() {
        if(fetchingRequired){
            samples = await PersistenceProvider.fetchData()
            fetchingRequired = false
        }
    },
    async remove(dbObject) {
        await PersistenceProvider.removeObject(dbObject)
        fetchingRequired = true
    },
    async save(dbObject) {
        dbObject.date = getCurrentDate()
        dbObject.time = getCurrentTime()
        await PersistenceProvider.save(dbObject)
        fetchingRequired = true
        return true
    },
    async update(id,dbObject){
        try {
            return await PersistenceProvider.update(id,dbObject)
        } catch (msg) {
            console.log(msg)
            return false
        }
    }
}

