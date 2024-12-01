import { getFirebaseApp } from "../../firebaseConfig";
import { addDoc, collection, deleteDoc, getDocs, getFirestore, query, where } from "@firebase/firestore/lite";
import { uploadToStorage } from "../Camera/imageBlob";
import { userInfo } from "../Auth/notesAuth"

const app = getFirebaseApp()
const db = getFirestore(app)

const colletionName = 'UserNotes'

export const clear = async () => true

export async function all() {
    const user = userInfo()
    const colRef = collection(db, colletionName)
    const q = query(colRef, where("userId", "==", user.uid))
    const docsRef = await getDocs(q)
    const fetched = []
    docsRef.forEach(doc => {
        const note = doc.data()
        note.id = doc.id
        fetched.push(note)
    })
    return fetched
}

export async function removeById(id) {
    const colRef = collection(db, colletionName)
    const docsRef = await getDocs(colRef)
    const docs = docsRef.docs
    const doc = docs.find(doc => doc.id === id)
    await deleteDoc(doc.ref)
    return true
}

export async function save(dbObject) {
    dbObject.images = await uploadToStorage(dbObject.images)
    const colRef = collection(db, colletionName)
    await addDoc(colRef, dbObject)
    return true
}
