//import JsonDb from "./NotesJsonFileStorage"
import GoogleFirestore from "../Persistence/DbFirestore"

const PersistenceProvider = GoogleFirestore

PersistenceProvider.collectionId = 'Samples'

let samples = []
let fetchingRequired = true

export default {
    isFetched() {
        return !fetchingRequired
    },
    getAll() {
        return samples
    },
    getById(id) {
        return samples.find(s => s.id == id)
    },
    fromLocation(locationId) {
        return samples.filter(item => item.location == locationId)
    },
    async fetch() {
        if (fetchingRequired) {
            samples = await PersistenceProvider.fetchData()
            fetchingRequired = false
        }
    },
    async forceFetch(){
        samples = await PersistenceProvider.fetchData()
    },
    async remove(dbObject) {
        try {
            await PersistenceProvider.removeObject(dbObject.id)
        } catch (msg) {
            return
        }
        fetchingRequired = true
    },
    async save(dbObject) {
        try {
            await PersistenceProvider.save(dbObject)
        } catch (msg) {
            return false
        }
        fetchingRequired = true
        return true
    },
    async update(id, dbObject) {
        try {
            await PersistenceProvider.update(id, dbObject)
            fetchingRequired = true
            return true
        } catch (msg) {
            return false
        }
    }
}

