import { getFirebaseApp } from "../../firebaseConfig";
import { addDoc, collection, deleteDoc, getDocs, getFirestore, query, where } from "@firebase/firestore";
import { signOut } from "../Auth/notesAuth";

import { userInfo } from "../Auth/notesAuth"

const app = getFirebaseApp()
const db = getFirestore(app)

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
    async getDocument(id) {
        const colRef = collection(db, this.collectionId)
        const docsRef = await getDocs(colRef)
        const docs = docsRef.docs
        return docs.find(doc => doc.id === id)
    },
    async removeObject(sample) {
        const doc = await getDocument(sample.id,this.collectionId)
        await deleteDoc(doc.ref)
    },
    async save(dbObject) {
        const colRef = collection(db, this.collectionId)
        await addDoc(colRef, dbObject).catch(err => console.log(err))
        return true
    }
}
