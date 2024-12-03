export function getCurrentTime(){
    const date = new Date()
    const hours = date.getHours()
    const minuttes = date.getMinutes()
    const seconds = date.getSeconds()
    return `${hours}:${minuttes}:${seconds}`
}

export function getCurrentDate(){
    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth()
    const day = date.getDay()
    return `${year}-${month}-${day}`
}