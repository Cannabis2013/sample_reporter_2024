const date = new Date()

export function getCurrentDate(){
    const utcDay = date.getUTCDay()
    const year = date.getFullYear()
    const day = utcDay < 10 ? `0${utcDay}` : utcDay
    const month = date.getMonth()
    return `${year}:${month}:${day}`
}

export function getCurrentTime(){
    const hours = date.getUTCHours()
    const minutes = date.getUTCMinutes()
    const seconds = date.getUTCSeconds()
    return `${hours}:${minutes}:${seconds}`
}