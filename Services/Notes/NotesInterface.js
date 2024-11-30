//import * as LocalNotes from "./NotesJsonFileStorage"
import * as FirebaseNotes from "./NotesGoogleFirebase"

const storageProvider = FirebaseNotes

let notes = []
let fetchingRequired = true

export function needsFetching() {
    return fetchingRequired
}

export function setNeedsFetching(status){
    fetchingRequired = status
}

export function getAllNotes (){
    return notes
}

export async function fetchNotes(){
    if(fetchingRequired){
        notes = await storageProvider.all()
        fetchingRequired = false
        return true
    }
    return false
}

export async function removeNoteById (id){
    const result =  await storageProvider.removeById(id)
    fetchingRequired = true
    return result
}

export async function saveNote (noteObject) {
    const result = await storageProvider.save(noteObject)
    fetchingRequired = true
    return result
}

