import * as axios from 'axios'

const instance = axios.create({
    baseURL: 'https://api.github.com/orgs/',
    headers: {
        Accept: 'application/vnd.github+json'
    },
})

export function fetchOrg(search) {
    return instance.get(`${search}`).catch(function (error) {
        const {status, data} = error.response
        return {status, data}
    })
}

export function fetchRepos(search, page) {
    return instance.get(`${search}/repos?per_page=10&page=${page}`)
}
