import axios, { AxiosResponse } from 'axios';
import { Listing } from '../models/listing';

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    })
}

axios.defaults.baseURL = 'http://localhost:5063/api';

axios.interceptors.response.use(response => {
    return sleep(1000).then(() => {
        return response;
    }).catch((error) => {
        console.log(error);
        return Promise.reject(error);
    })
})

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T> (url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url).then(responseBody),
    del: <T> (url: string) => axios.delete<T>(url).then(responseBody)
}

const Listings = {
    list: () => requests.get<Listing[]>('/listings'),
    details: (id: string) => requests.get<Listing>(`/listings/${id}`),
    create: (listing: Listing) => axios.post<void>('/listings', listing),
    update: (listing: Listing) => axios.put<void>(`/listings/${listing.id}`, listing),
    delete: (id: string) => axios.delete<void>(`/listings/${id}`)
}

const agent = {
    Listings
}


export default agent;