export const makeItjetPack = (url : string, width:number = 250, quality:number = 100) => {
    const newUrl = url.replace('https://','https://i1.wp.com/')+`?ssl=1&w=${width}&quality=${quality}`
    return newUrl
}