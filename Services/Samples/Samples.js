//import * as LocalNotes from "./NotesJsonFileStorage"
import * as FirebaseNotes from "../Persistence/DbFirestore"
import Storage from "../Persistence/StorageFirebase";
import { getCurrentDate, getCurrentTime } from "../../Utils/date"

const PersistenceProvider = FirebaseNotes

const collectionId = 'Samples'
let samples = []
let fetchingRequired = true

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
    fromLocation(locationId){
        return samples.filter(item => item.location == locationId)
    },
    async fetch() {
        if(fetchingRequired){
            samples = await PersistenceProvider.fetchData(collectionId)
            fetchingRequired = false
            return true
        }
        return false
    },
    async remove(dbObject) {
        const uris = dbObject.images.map(img => img.imageId)
        await Storage.removeObjects(uris)
        await PersistenceProvider.removeObject(dbObject,collectionId)
        fetchingRequired = true
    },
    async save(dbObject) {
        dbObject.images = await Storage.uploadObjects(dbObject.images)
        dbObject.date = getCurrentDate()
        dbObject.time = getCurrentTime()
        const result = await PersistenceProvider.save(dbObject,collectionId)
        fetchingRequired = true
        return result
    },

    async update(dbObject){
        
    }
}

