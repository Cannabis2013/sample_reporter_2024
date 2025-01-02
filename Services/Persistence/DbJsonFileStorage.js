import * as FileSystem from "expo-file-system"

const FILEPATH = `${FileSystem.documentDirectory}data.json`

export default {
    async all() {
        const data = await FileSystem.readAsStringAsync(FILEPATH)
        return JSON.parse(data ?? [])
    },
    async removeObject(id) {
        const data = await all()
        const filtered = data.filter(d => d.id !== id)
        await FileSystem.writeAsStringAsync(FILEPATH, JSON.stringify(filtered))
    },
    async save (dbObject) {
        const data = await all()
        data.push(dbObject)
        await FileSystem.writeAsStringAsync(FILEPATH, JSON.stringify(data))
        return true
    },
    async update(id, dbObject){
        const data = await all()
        const filtered = data.filter(d => d.id != id)
        filtered.push(dbObject)
        await FileSystem.writeAsStringAsync(FILEPATH, JSON.stringify(filtered))
        return true
    }
}

