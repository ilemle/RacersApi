import axios from 'axios'
import { paginationSize } from '../constants'

const baseUrl = 'https://ergast.com/api/f1'


export const getRacers = (selectedPage: number) => {
    // alert(selectedPage)
    return axios.get(`${baseUrl}/drivers.json?limit=${paginationSize}&offset=${selectedPage * paginationSize}`).then(res => res.data)
}

export const getRacerCircuits = (selectedPage: number, driverId: string) => {
    return axios.get(`${baseUrl}/drivers/${driverId}/circuits.json?limit=${paginationSize}&offset=${selectedPage * paginationSize}`).then(res => res.data)
}