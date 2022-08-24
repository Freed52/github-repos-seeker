export const parseLink = (str) => {
    let parsed_data = {}

    let arrData = str.split(",")

    for (let d of arrData){
        let linkInfo = /<([^>]+)>;\s+rel="([^"]+)"/ig.exec(d)

        parsed_data[linkInfo[2]]=linkInfo[1]
    }

    return parsed_data;
}

export const getPagesCount = (str) => {
    const totalPages = Number(str.last.split('&')[1].split('=')[1])
    return Math.ceil(totalPages / 10)
}

export const setPaginationSequence = (num) => {
    return Array.apply(null, Array(num)).map(function (x, i) { return i; })
}