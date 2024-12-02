//import * as LocalNotes from "./NotesJsonFileStorage"
import * as FirebaseNotes from "./DataGoogleFirebase"

const storageProvider = FirebaseNotes

let samples = []
let fetchingRequired = true

export function needsFetching() {
    return fetchingRequired
}

export function setNeedsFetching(status){
    fetchingRequired = status
}

export function getAll (){
    return samples
}

export async function fetch(){
    if(fetchingRequired){
        samples = await storageProvider.all()
        fetchingRequired = false
        return true
    }
    return false
}

export async function remove(sample){
    const result =  await storageProvider.removeObject(sample)
    fetchingRequired = true
    return result
}

export async function save (dbObject) {
    const result = await storageProvider.save(dbObject)
    fetchingRequired = true
    return result
}

