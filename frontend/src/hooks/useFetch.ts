import useSWR from 'swr'
import { api } from '../services/api'

interface IOptionsRequest {
    search?: string | null;
    page?: number;
    order?: 'asc' | 'desc'
}

export function useFetch<Data = any>(path: string, options: IOptionsRequest) {
    let url = `${process.env.REACT_APP_API_URL}${path}`

    if(options.search) {
        url = `${process.env.REACT_APP_API_URL}${path}/${options.search}`
    }
    
    if(options.page) {
        url += `?page=${options.page || 1}&order=${options.order || 'asc'}`
    }

    const { data, error, mutate } = useSWR<Data, Error>(`${url}`, async path => {
        const { data } = await api.get(path) as { data: Data }
        return data
    }, {
        errorRetryCount: 1,
        shouldRetryOnError: true,
    })

    return { data, error, mutate }
}