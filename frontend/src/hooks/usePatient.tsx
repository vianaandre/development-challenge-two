import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { format } from 'date-fns'
import { IPatient } from '../common/interfaces/IPatient'
import { IPatientsRequest } from '../common/interfaces/IPatientRequest'
import { API_URL_PATIENTS } from '../services/api/routes'
import { useFetch } from './useFetch'
import { api } from '../services/api'
import { useToast } from './useToast'

export interface IPatientDate {
    name: string;
    birth_date: Date;
    email: string;
    district: string;
    number: number;
    city: string;
    cep: string;
    state: string;
}

interface PatientContextData {
    handleSubmit(data: IPatient, type: 'create' | 'update', id?: string): Promise<void>;
    data: IPatientsRequest | undefined;
    handlePageByOrder(page: number, order: 'asc' | 'desc'): void;
    handleSearch(search: string): void;
    handleDelete(ids: String[]): void;
    error: any
}

const PatientContext = createContext<PatientContextData>({} as PatientContextData);

export const PatientProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [ isPage, setIsPage ] = useState(1)
    const [ isOrder, setIsOrder ] = useState<'asc' | 'desc'>('asc')
    const [ isSearch, setIsSearch ] = useState<string | null>(null)
    const { addToast } = useToast()

    const { data, mutate, error } = useFetch<IPatientsRequest>(API_URL_PATIENTS, {
        order: isOrder,
        page: isPage,
        search: isSearch
    })

    const handlePageByOrder = useCallback((page: number, order: 'asc' | 'desc') => {
        setIsPage(page)
        setIsOrder(order)
    }, [])

    const handleSearch = useCallback((search: string) => {
        setIsSearch(search)
    }, [])

    const handleSubmit = useCallback(async (dataPatient: IPatient, type: 'create' | 'update', id?: string) => {            
            if(type === 'create') {
                const response = await api.post(API_URL_PATIENTS, {
                    name: dataPatient.name,
                    birth_date: format(new Date(dataPatient.birth_date), "yyyy'-'MM'-'dd"),
                    email: dataPatient.email,
                    address: {
                        city: dataPatient.address.city,
                        state: dataPatient.address.state,
                        postcode: dataPatient.address.postcode,
                        number: dataPatient.address.number,
                        neighborhood: dataPatient.address.neighborhood,
                        district: dataPatient.address.district
                    }
                })

                id = response.data.id
                if(data) {
                    await mutate({ ...data, patients: [ ...data.patients, response.data ] }, true)
                }
            }
            if(type === 'update' && dataPatient) {
                await api.put(`${API_URL_PATIENTS}/${id}`, {
                    name: dataPatient.name,
                    birth_date: format(new Date(dataPatient.birth_date), "yyyy'-'MM'-'dd"),
                    email: dataPatient.email,
                    address: {
                        city: dataPatient.address.city,
                        state: dataPatient.address.state,
                        postcode: dataPatient.address.postcode,
                        number: dataPatient.address.number,
                        neighborhood: dataPatient.address.neighborhood,
                        district: dataPatient.address.district
                    }
                })
                if(data && data.patients) {
                    const isNewPatients = data.patients.map(patient => {
                        if (patient.id === id) {
                            return { ...patient, ...dataPatient }
                        }
    
                        return {
                            ...patient
                        }
                    })
                    await mutate({ ...data, patients: isNewPatients }, true)
                }
            }
    }, [data])

    const handleDelete = useCallback(async (ids: String[]) => {
        await api.delete(`${API_URL_PATIENTS}/${ids.join(';')}`)

        if(data && data.patients) {
            const isNewPatients = data.patients.map(patient => {
                const isFindPatient = ids.find(item => item === patient.id)
                if(isFindPatient) return null
            
                return patient
            }).filter(item => item !== null) as IPatient[]

            if(isNewPatients) await mutate({ ...data, patients: isNewPatients}, true)
        }

    }, [data])

    useEffect(() => {
        if(error) {
            addToast({
                type: 'error',
                description: JSON.stringify(error.message),
                openToast: true
            })
        }
    }, [error])

    return (
        <PatientContext.Provider value={{ data, handleSubmit, handlePageByOrder, handleSearch, handleDelete, error }}>
            {children}
        </PatientContext.Provider>
    );
};

export function usePatient(): PatientContextData {
  const context = useContext(PatientContext);
  return context;
}
