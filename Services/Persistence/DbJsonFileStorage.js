import * as FileSystem from "expo-file-system"

const FILEPATH = `${FileSystem.documentDirectory}data.json`

export async function all() {
    const data = await FileSystem.readAsStringAsync(FILEPATH).catch(async err => {
        await persistNotes([])
        return []
    })
    return JSON.parse(data)
}

export async function removeById(id) {
    const data = await all()
    const filtered = data.filter(d => d.id !== id)
    await persistNotes(filtered)
}

export async function save (dbObject) {
    const data = await all()
    data.push(dbObject)
    const json = JSON.stringify(data)
    await FileSystem.writeAsStringAsync(FILEPATH, json)
    return true
}

