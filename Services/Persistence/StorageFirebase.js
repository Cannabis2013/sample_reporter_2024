import { getStorageReference } from "../../firebaseConfig";
import { getDownloadURL, ref, uploadBytes, deleteObject } from "@firebase/storage";
import { asBlob } from "../../Services/Images/imageFetch"

function createPath() {
    const title = "img-" + new Date().getTime();
    return `images/${title}.jpg`
}

async function toStorageBlobs(data) {
    let storageBlobs = []
    for (let i = 0; i < data.length; i++) {
        const blob = await asBlob(data[i])
        const storageBlob = { data: blob, path: createPath() }
        storageBlobs.push(storageBlob)
    }
    return storageBlobs
}

function handleError(error) {
    return undefined
}

function getStorageRef(imagePath) {
    try {
        return ref(getStorageReference(), imagePath)
    } catch (error) {
        return handleError(error)
    }
}

async function uploadFile(storageRef, file) {
    const snapShot = await uploadBytes(storageRef, file)
        .catch(handleError)
    if (snapShot) {
        return await getDownloadURL(snapShot.ref)
            .catch(handleError)
    }
    return snapShot
}

async function upload(object) {
    const storageRef = getStorageRef(object.path)
    if (!storageRef)
        return undefined
    const imageUri = await uploadFile(storageRef, object.data)
    return { imageId: object.path, uri: imageUri }
}

export default {
    async uploadObjects(dataObjects) {
        const blobs = await toStorageBlobs(dataObjects)
        const objectRefs = []
        let objectRef
        for (let i = 0; i < blobs.length; i++) {
            const blob = blobs[i]
            objectRef = await upload(blob)
            objectRefs.push(objectRef)
        }
        return objectRefs
    },
    async removeObject(objectId) {
        const ref = getStorageRef(objectId);
        await deleteObject(ref)
    },
    async removeObjects(objectIds) {
        for (let i = 0; i < objectIds.length; i++)
            await removeObject(objectIds[i])
    }
}

