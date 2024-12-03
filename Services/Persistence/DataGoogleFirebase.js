import { getFirebaseApp } from "../../firebaseConfig";
import { addDoc, collection, deleteDoc, getDocs, getFirestore, query, where } from "@firebase/firestore";
import { removeFromStorage, uploadToStorage } from "../Images/imageStorage";
import { userInfo } from "../Auth/notesAuth"

const app = getFirebaseApp()
const db = getFirestore(app)

const colletionName = 'Samples'

export async function clear() {
    return true
}

export async function all() {
    const user = userInfo()
    const colRef = collection(db, colletionName)
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

async function getDocument(id) {
    const colRef = collection(db, colletionName)
    const docsRef = await getDocs(colRef)
    const docs = docsRef.docs
    return docs.find(doc => doc.id === id)
}

export async function removeObject(sample) {
    const uris = sample.images.map(img => img.imageId)
    await removeFromStorage(uris)
    const doc = await getDocument(sample.id)
    await deleteDoc(doc.ref)
}

export async function save(dbObject) {
    dbObject.images = await uploadToStorage(dbObject.images)
    const colRef = collection(db, colletionName)
    await addDoc(colRef, dbObject)
        .catch(err => console.log(err))
    return true
}
