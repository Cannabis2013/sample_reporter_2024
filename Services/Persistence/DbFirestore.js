import { getFirebaseApp } from "../../firebaseConfig";
import { addDoc, collection, deleteDoc, getDocs, getFirestore, query, where } from "@firebase/firestore";
import { signOut } from "../Auth/notesAuth";

import { userInfo } from "../Auth/notesAuth"

const app = getFirebaseApp()
const db = getFirestore(app)

let data = []
export let fetchingRequired = true

const collectionId = 'Samples'

export async function clear() {
    return true
}

export function getAll() {
    return data
}

async function fetch() {
    const user = userInfo()
    const colRef = collection(db, collectionId)
    const q = query(colRef, where("userId", "==", user.uid))
    const docsRef = await getDocs(q)
    const fetched = []
    docsRef.forEach(doc => {
        const sample = doc.data()
        sample.id = doc.id
        fetched.push(sample)
    })
    return fetched
}

async function handleFetchError(e) {
    if (e.code == "permission-denied")
        await signOut()
}

export async function fetchData() {
    if (fetchingRequired) {
        data = await fetch().catch(handleFetchError)
        fetchingRequired = false
        return true
    }
    return false
}

async function getDocument(id) {
    const colRef = collection(db, collectionId)
    const docsRef = await getDocs(colRef)
    const docs = docsRef.docs
    return docs.find(doc => doc.id === id)
}

export async function removeObject(sample) {
    const doc = await getDocument(sample.id)
    await deleteDoc(doc.ref)
    fetchingRequired = true
}

export async function save(dbObject) {
    const colRef = collection(db, collectionId)
    await addDoc(colRef, dbObject).catch(err => console.log(err))
    fetchingRequired = true
    return true
}
