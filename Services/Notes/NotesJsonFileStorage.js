import * as FileSystem from "expo-file-system"
import { v4 as Uuid } from 'uuid';

const FILEPATH = `${FileSystem.documentDirectory}notes.json`

const persistNotes = async (notes) => {
    const data = notes ? notes : []
    await FileSystem.writeAsStringAsync(FILEPATH, JSON.stringify(data))
        .catch(err => {
            console.log(err)
            return false
        })
    return true
}

const fetchNotes = async () => {
    const data = await FileSystem.readAsStringAsync(FILEPATH).catch(async err => {
        await persistNotes()
        return []
    })
    return JSON.parse(data)
}

const createItem = (noteObject) => {
    return {
        title: noteObject.title,
        content: noteObject.content,
        logoUri: noteObject.imageUri,
        latitude: noteObject.location.latitude,
        longitude: noteObject.location.longitude
    }
}

export const all = async () => await fetchNotes()

export const removeById = async id => {
    const notes = await fetchNotes()
    const filtered = notes.filter(n => n.id !== id)
    await persistNotes(filtered)
}

export const save = async (noteObject, completeHandler) => {
    const data = await fetchNotes()
    const item = createItem(noteObject)
    data.push(item)
    await persistNotes(data)
    completeHandler()
}

