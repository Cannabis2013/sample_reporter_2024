import { getFirebaseApp } from "../../firebaseConfig";
import { addDoc, collection, deleteDoc, getDocs, getFirestore, query, where, updateDoc, doc } from "@firebase/firestore";
import { getCurrentDate, getCurrentTime } from "../../Utils/date"
import Auth from "../Auth/notesAuth"

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
        const user = Auth.userInfo()
        const colRef = collection(db, this.collectionId)
        const q = query(colRef, where("userId", "==", user.uid))
        const docsRef = await getDocs(q)
        const fetched = []
        docsRef.forEach(doc => {
            const dbObject = doc.data()
            dbObject.id = doc.id
            fetched.push(dbObject)
        })
        return fetched
    },
    async removeObject(id) {
        const doc = await getDocument(id,this.collectionId)
        await deleteDoc(doc.ref)
    },
    async save(dbObject) {
        dbObject.date = getCurrentDate()
        dbObject.time = getCurrentTime()
        dbObject.userId = Auth.userInfo()
        await addDoc(collection(db, this.collectionId), dbObject)
    },
     async update(id,dbObject){
        await updateDoc(doc(collection(db, this.collectionId), id),dbObject)
     }
}
