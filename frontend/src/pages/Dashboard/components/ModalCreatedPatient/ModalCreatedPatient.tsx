import { Modal, Typography , Box, IconButton, Button } from "@mui/material"
import React, { useCallback, useEffect, useState } from "react"
import CloseIcon from '@mui/icons-material/Close'
import PersonIcon from '@mui/icons-material/Person'
import EmailIcon from '@mui/icons-material/Email'
import RoomIcon from '@mui/icons-material/Room'
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered'
import ApartmentIcon from '@mui/icons-material/Apartment'
import HomeIcon from '@mui/icons-material/Home'
import HolidayVillageIcon from '@mui/icons-material/HolidayVillage'
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { format } from 'date-fns'
import { InputDate , Input } from '../../../../components/Form'
import { IModalCreatedPatient, IPatientDate } from './interface'
import { maskCep } from '../../../../common/utils/maskCep'
import { api } from '../../../../services/api'
import { API_URL_PATIENTS } from '../../../../services/api/routes'
import { useToast } from '../../../../hooks/useToast'

const schema = yup.object().shape({
    name: yup.string().required("Nome do paciente é inválido."),
    email: yup.string().email().required("E-mail é inválido."),
    district: yup.string().required("Nome do bairro é inválido."),
    number: yup.number().positive("Deve ser um valor positivo.").integer("Deve ser um valor inteiro.").required("Número é inválido."),
    city: yup.string().required("Nome da cidade é inválido."),
    state: yup.string().required("Nome do estado é inválido."),
})

export const ModalCreatedPatient: React.FC<IModalCreatedPatient> = ({ open, setIsOpenModal }) => {
    const { handleSubmit, control, setValue, formState: { errors } } = useForm<IPatientDate>({
        resolver: yupResolver(schema)
    })
    const { addToast } = useToast()
    const [ isCep, setIsCep ] = useState<string>('')
    const [ isBirthDate, setIsBirthdate ] = useState<Date | null>(null)
    const [ isLoading, setIsLoading ] = useState<boolean>(false)
    const [ isErrorCep, setIsErrorCep ] = useState<string | null>(null)
    const [ isErrorBirthDate, setIsErrorBirthDate ] = useState<string | null>(null)

    const handleSubmitPatient = useCallback(async (data: IPatientDate) => {
        try {
            setIsLoading(true)
            setIsErrorCep(null)
            setIsErrorBirthDate(null)

            if(!isBirthDate) {
                setIsErrorBirthDate("Data de nascimento é inválida.")
                return
            }
            if(isCep.length < 9) {
                setIsErrorCep("CEP é inválido.")
                return
            }

            await api.post(API_URL_PATIENTS, {
                name: data.name,
                birth_date: format(new Date(isBirthDate), "yyyy'-'MM'-'dd"),
                email: data.email,
                address: {
                    city: data.city,
                    state: data.state,
                    postcode: data.cep,
                    number: data.number,
                    neighborhood: data.district
                }
            })

            setIsLoading(false)
            setIsErrorCep(null)
            setIsErrorBirthDate(null)
            addToast({
                openToast: true,
                description: "Paciente criado com sucesso.",
                type: 'success'
            })
            setIsOpenModal(false)
        } catch(err: any) {
            addToast({
                openToast: true,
                description: JSON.stringify(err.message),
                type: 'error'
            })
        }
    }, [isBirthDate, isCep])
   
    const onSubmit = (data: IPatientDate) => handleSubmitPatient({
        name: data.name,
        email: data.email,
        birth_date: isBirthDate,
        district: data.district,
        cep: isCep,
        city: data.city,
        number: data.number,
        state: data.state
    }); 

    const handleViaCepLoad = useCallback(async (cep: string) => {
        try {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
            const json = await response.json()

            setValue('district', json.bairro)
            setValue('state', json.uf)
            setValue('city', json.localidade)
        } catch(err: any) {
            addToast({
                openToast: true,
                description: JSON.stringify(err.message),
                type: 'error'
            })
        }
    }, [])

    const handleClearFileds = useCallback(() => {
        setValue('district', "")
        setValue('state', "")
        setValue('city', "")
        setValue('name', "")
        setValue('number', 0)
        setValue('email', "")
        setIsCep("")
        setIsBirthdate(null)

        setIsOpenModal(false)
    }, [])

    useEffect(() => {
        if(isCep.length === 9) {
            const [ partOne, partTwo ] = isCep.split('-')
            handleViaCepLoad(`${partOne}${partTwo}`)
        }
    }, [isCep])

    return (
        <Modal
            onClose={() => setIsOpenModal(false)}
            open={open}
        >
            <Box width="100%" height="100%" display="flex" alignItems="center" justifyContent="center">
                <Box width="90%" maxWidth={700} bgcolor="#FFF" padding={4} borderRadius={.75}> 
                    <Box width="100%" display="flex" justifyContent="space-between" alignItems="center" borderBottom={1} borderColor="secondary.main" paddingBottom={3}>
                        <Typography variant="h6" fontWeight={700} color="primary.dark" >
                            Criar Paciente
                        </Typography>
                        <IconButton onClick={handleClearFileds}>
                            <CloseIcon color="action"/>
                        </IconButton>
                    </Box>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Box width="100%" display="flex" flexDirection="column" gap={3} mt={3} className="create-patient"> 
                                <Box display="flex" justifyContent="space-between">
                                    <Box width="49%">
                                        <Controller
                                            name="name"
                                            control={control}
                                            render={({ field: { onChange, value } }) => (
                                                <Input id="name" value={value} type="text" placeholder="Informe o nome do paciente..." Icon={PersonIcon} labelText="Nome" requiredField onChange={onChange} error={!!errors.name} errorText={errors.name?.message} />
                                            )}
                                         />
                                    </Box>
                                    <Box width="49%">
                                    <Controller
                                        name="birth_date"
                                        control={control}
                                        render={() => (
                                            <InputDate labelText="Data de nascimiento" requiredField id="birth_date" setIsBirthDate={setIsBirthdate} value={isBirthDate} error={!!isErrorBirthDate} errorText={isErrorBirthDate} />
                                        )}
                                        />
                                    </Box>
                                </Box>
                                          
                                <Controller
                                    name="email"
                                    control={control}
                                    render={({ field: { onChange, value } }) => (
                                        <Input id="email" type="text" placeholder="Informe o e-mail do paciente..." Icon={EmailIcon} labelText="E-mail" requiredField onChange={onChange} value={value} error={!!errors.email} errorText={errors.email?.message} />
                                    )}
                                />

                                <Box width="100%" display="flex" gap={1} alignItems="center">
                                    <Typography variant="body2" color="primary.dark" fontWeight={600}>
                                        Endereço
                                    </Typography>
                                    <Box flex={1} height={2} bgcolor="secondary.main" />
                                </Box>

                                <Box width="100%" display="flex" flexWrap="wrap" justifyContent="space-between">
                                    <Box width="49%" mb={3}>
                                        <Input id="cep" name="cep" type="text" placeholder="CEP" Icon={HomeIcon} labelText="CEP" requiredField onChange={(event) => {
                                            if(event.target.value.length > 9) {
                                                return
                                            }
                                            setIsCep(maskCep(event.target.value))
                                        }} value={isCep} error={!!isErrorCep} errorText={isErrorCep} />
                                    </Box>
                                    <Box width="49%" mb={3}>
                                        <Controller
                                            name="number"
                                            control={control}
                                            render={({ field: { onChange, value } }) => (
                                                <Input id="number" type="number" placeholder="Número" Icon={FormatListNumberedIcon} labelText="Número" requiredField onChange={onChange} value={value} error={!!errors.number} errorText={errors.number?.message} />
                                            )}
                                        />
                                    </Box>
                                    <Box width="100%" mb={3}>
                                        <Controller
                                            name="district"
                                            control={control}
                                            render={({ field: { onChange, value } }) => (
                                                <Input id="district" type="text" placeholder="Bairro" Icon={RoomIcon} labelText="Bairro" requiredField onChange={onChange} value={value} error={!!errors.district} errorText={errors.district?.message} />
                                            )}
                                        />
                                    </Box>
                                    <Box width="49%" mb={3}>
                                        <Controller
                                            name="city"
                                            control={control}
                                            render={({ field: { onChange, value } }) => (
                                                <Input id="city" type="text" placeholder="Cidade" Icon={ApartmentIcon} labelText="Cidade" requiredField onChange={onChange} value={value} error={!!errors.city} errorText={errors.city?.message} />
                                            )}
                                        />
                                    </Box>
                                    <Box width="49%" mb={3}>
                                        <Controller
                                            name="state"
                                            control={control}
                                            render={({ field: { onChange, value } }) => (
                                                <Input id="state" type="text" placeholder="Estado" Icon={HolidayVillageIcon} labelText="Estado" requiredField onChange={onChange} value={value} error={!!errors.state} errorText={errors.state?.message} />
                                            )}
                                        />
                                    </Box>
                                </Box>
                        </Box>
                        <Box width="100%" display="flex" justifyContent="flex-end" gap={2} mt={1}>
                            <Button variant="text" sx={{
                                width: 108,
                                height: 40,
                            }} onClick={handleClearFileds}>
                                <Typography variant="body2" color="primary" fontWeight={500} pt={.2}>
                                    Cancelar
                                </Typography>
                            </Button>
                            <Button variant="text" type="submit" sx={{
                                width: 108,
                                height: 40,
                                backgroundColor: 'primary.main',
                                ":hover": {
                                    backgroundColor: '#0A39B9'
                                }
                            }}>
                                <Typography color="#FFF" variant="body2" fontWeight={700} pt={0.2}>
                                    {isLoading ? 'salvando' : 'Salvar'}
                                </Typography>
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Box>
        </Modal>
    )
}