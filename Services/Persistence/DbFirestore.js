import { getFirebaseApp } from "../../firebaseConfig";
import { addDoc, collection, deleteDoc, getDocs, getFirestore, query, where } from "@firebase/firestore";
import { signOut } from "../Auth/notesAuth";

import { userInfo } from "../Auth/notesAuth"

const app = getFirebaseApp()
const db = getFirestore(app)

export async function clear() {
    return true
}

export function getAll(predicate) {
    if(!predicate)
        return data
    return data.filter(predicate)
}

async function handleFetchError(e) {
    if (e.code == "permission-denied")
        await signOut()
}

export async function fetchData(collectionId) {
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

async function getDocument(id,collectionId) {
    const colRef = collection(db, collectionId)
    const docsRef = await getDocs(colRef)
    const docs = docsRef.docs
    return docs.find(doc => doc.id === id)
}

export async function removeObject(sample,collectionId) {
    const doc = await getDocument(sample.id,collectionId)
    await deleteDoc(doc.ref)
}

export async function save(dbObject,collectionId) {
    const colRef = collection(db, collectionId)
    await addDoc(colRef, dbObject).catch(err => console.log(err))
    return true
}
