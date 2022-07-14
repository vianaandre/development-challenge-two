import useSWR from 'swr'
import { api } from '../services/api'

export const useFetch = (path: string) => {
    const { data, error } = useSWR(`${process.env.REACT_APP_API_URL}${path}`, async path => {
        const response = await api.get(path)

        return response
    }, {
        errorRetryCount: 1,
        shouldRetryOnError: true
    })

    return { data, error }
}