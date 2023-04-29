
/* eslint-disable */
function filterArtWork(filter: String, artWorks: any) {
    if (filter == "New & Noteworthy") {
        return artWorks
    }
    else if (filter == "Popular") {
        let sortedPopular = [...artWorks]
        sortedPopular.sort((a1: any, a2: any) => { return a2.likes - a1.likes})
        return sortedPopular
    }
    else if (filter == "Following") {
        return artWorks
    }
    else {
        return artWorks
    }
}
export default filterArtWork