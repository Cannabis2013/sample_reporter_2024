import { getStorageReference } from "../../firebaseConfig";
import { getDownloadURL, ref, uploadBytes, deleteObject } from "@firebase/storage";

let errorMessage

function handleError(error) {
    errorMessage = error
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

async function upload(fileBlob, path) {
    const storageRef = getStorageRef(path)
    if (!storageRef)
        return undefined
    const imageUri = await uploadFile(storageRef, fileBlob)
    return { imageId: path, uri: imageUri }
}

export async function uploadObjects(dataObjects) {
    const objectRefs = []
    let objectRef
    for (let i = 0; i < dataObjects.length; i++) {
        const object = dataObjects[i];
        objectRef = await upload(object.data,object.path)
        objectRefs.push(objectRef)
    }
    return objectRefs
}

export async function removeObject(objectId) {
    const ref = getStorageRef(objectId);
    await deleteObject(ref)
}

export async function removeObjects(objectIds) {
    for (let i = 0; i < objectIds.length; i++)
        await removeObject(objectIds[i])
}