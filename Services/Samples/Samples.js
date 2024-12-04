//import * as LocalNotes from "./NotesJsonFileStorage"
import * as FirebaseNotes from "../Persistence/DbFirestore"
import { uploadObjects, removeObjects } from "../Persistence/StorageFirebase";
import { asBlob } from "../Images/imageFetch";
import { getCurrentDate, getCurrentTime } from "../../Utils/date"
const PersistenceProvider = FirebaseNotes

function createPath() {
    const imgName = "img-" + new Date().getTime();
    return `images/${imgName}.jpg`
}

async function toStorageBlobs(data) {
    let imageBlobs = []
    for (let i = 0; i < data.length; i++) {
        const blob = await asBlob(data[i])
        const imageBlob = { data: blob, path: createPath() }
        imageBlobs.push(imageBlob)
    }
    return imageBlobs
}

export default {
    needsFetching() {
        return PersistenceProvider.fetchingRequired
    },

    setNeedsFetching(status) {
        PersistenceProvider.needsFetching = status
    },

    getAll() {
        return PersistenceProvider.getAll()
    },

    async fetch() {
        return await PersistenceProvider.fetchData()
    },

    async remove(dbObject) {
        const uris = dbObject.images.map(img => img.imageId)
        await removeObjects(uris)
        await PersistenceProvider.removeObject(dbObject)
    },

    async save(dbObject) {
        const imageBlobs = await toStorageBlobs(dbObject.images)
        dbObject.images = await uploadObjects(imageBlobs)
        dbObject.date = getCurrentDate()
        dbObject.time = getCurrentTime()
        return await PersistenceProvider.save(dbObject)
    }
}

