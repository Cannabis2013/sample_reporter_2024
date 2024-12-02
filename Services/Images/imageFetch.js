/*
    This code is a gist from GitHub which can be found at https://gist.github.com/n1ru4l/dc99062577b746e0783410b1298ab897.
*/

async function fetchBlob(uri) {
    const res = await fetch(uri)
    if (res.ok)
        return res.blob()
    return undefined
}

async function toBase64(blob) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader;
        reader.onerror = reject;
        reader.onload = function() {
            resolve(reader.result);
        };
        reader.readAsDataURL(blob);
    })
}

export async function asBlob(uri) {
    return fetchBlob(uri)
}

export async function asBase64(uri) {
    if(!uri)
        return undefined
    const blob = await fetchBlob(uri)
    if (!blob)
        return undefined
    return await toBase64(blob)
}


