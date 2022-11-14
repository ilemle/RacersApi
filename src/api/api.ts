import axios from 'axios'

const baseUrl = 'http://ergast.com/api/f1'

const testurl = 'https://jsonplaceholder.typicode.com/users?_limit=10'

export const getRacers = (selectedPage:number) => {
    // return axios.get(`${baseUrl}/drivers.json?limit=${10}&offset=${10}`).then(res => res.data)
    return axios.get(`${baseUrl}/drivers.json?limit=${10}&offset=${selectedPage*10}`).then(res => res.data)
}