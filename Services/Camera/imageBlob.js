import { getStorageReference } from "../../firebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "@firebase/storage";

async function fetchBlob(uri) {
    const res = await fetch(uri)
    if (res.ok)
        return res.blob()
    return undefined
};

function handleError(error) {
    console.log(error)
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

async function upload(fileBlob) {
    const imgName = "img-" + new Date().getTime();
    const imgPath = `images/${imgName}.jpg`
    const storageRef = getStorageRef(imgPath)
    if (!storageRef)
        return undefined
    const imageUri = await uploadFile(storageRef, fileBlob)
    return { imageId: imgPath, uri: imageUri }
}

export async function uploadToStorage(uris) {
    const imageRefs = []
    let imageRef
    for (let i = 0; i < uris.length; i++) {
        const uri = uris[i];
        const blob = await fetchBlob(uri)
        imageRef = await upload(blob)
        imageRefs.push(imageRef)
    }
    return imageRefs
}