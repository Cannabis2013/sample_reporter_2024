import { getFirebaseApp } from "../../firebaseConfig";
import { addDoc, collection, deleteDoc, getDocs, getFirestore, query, where, updateDoc, doc } from "@firebase/firestore";
import { signOut } from "../Auth/notesAuth";

import { userInfo } from "../Auth/notesAuth"

const app = getFirebaseApp()
const db = getFirestore(app)

async function getDocument(id,collectionId) {
    const colRef = collection(db, collectionId)
    const docsRef = await getDocs(colRef)
    const docs = docsRef.docs
    return docs.find(doc => doc.id === id)
}

export default {
    collectionId: "",
    async clear() {
        return true
    },
    getAll(predicate) {
        if(!predicate)
            return data
        return data.filter(predicate)
    },
    async handleFetchError(e) {
        if (e.code == "permission-denied")
            await signOut()
    },
    async fetchData() {
        const user = userInfo()
        const colRef = collection(db, this.collectionId)
        const q = query(colRef, where("userId", "==", user.uid))
        const docsRef = await getDocs(q)
        const fetched = []
        docsRef.forEach(doc => {
            const sample = doc.data()
            sample.id = doc.id
            fetched.push(sample)
        })
        return fetched
    },
    async removeObject(sample) {
        const doc = await getDocument(sample.id,this.collectionId)
        await deleteDoc(doc.ref)
    },
    async save(dbObject) {
        const colRef = collection(db, this.collectionId)
        let result = true
        await addDoc(colRef, dbObject)
        return result
    },
     async update(id,dbObject){
        console.log("1")
        const colRef = collection(db, this.collectionId)
        const docRef = doc(colRef, id)
        let result = true
        console.log(dbObject)
        await updateDoc(docRef,dbObject)
        console.log("3")
        return result
     }
}
