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
        try {
            await PersistenceProvider.removeObject(dbObject)
        } catch (msg) {
            return
        }
        fetchingRequired = true
    },
    async save(dbObject) {
        dbObject.date = getCurrentDate()
        dbObject.time = getCurrentTime()
        try {
            await PersistenceProvider.save(dbObject)
        } catch (msg) {
            return false
        }
        fetchingRequired = true
        return true
    },
    async update(id,dbObject){
        try {
            await PersistenceProvider.update(id,dbObject)
            fetchingRequired = true
            return true
        } catch (msg) {
            return false
        }
    }
}

