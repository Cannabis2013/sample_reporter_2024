import * as FileSystem from "expo-file-system"

const FILEPATH = `${FileSystem.documentDirectory}data.json`

async function persistNotes(dbObjects) {
    const data = JSON.stringify(dbObjects)
    await FileSystem.writeAsStringAsync(FILEPATH, data)
    return true
}

async function fetchData() {
    const data = await FileSystem.readAsStringAsync(FILEPATH).catch(async err => {
        await persistNotes([])
        return []
    })
    return JSON.parse(data)
}

export async function all() {
    await fetchData()
}

export async function removeById(id) {
    const data = await fetchData()
    const filtered = data.filter(d => d.id !== id)
    await persistNotes(filtered)
}

export async function save (dbObject) {
    const data = await fetchData()
    data.push(dbObject)
    await persistNotes(data)
    return true
}

