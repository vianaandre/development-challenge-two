import { Modal, Typography, Box, IconButton, Button, CircularProgress, useMediaQuery } from "@mui/material"
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
import { isAfter } from 'date-fns'
import { InputDate , Input } from '../../../../components/Form'
import { IModalCreatedPatient, IPatientDate } from './interface'
import { maskCep } from '../../../../common/utils/maskCep'
import { useToast } from '../../../../hooks/useToast'
import { usePatient } from '../../../../hooks/usePatient'
import { IPatient } from "../../../../common/interfaces/IPatient"

const schema = yup.object().shape({
    name: yup.string().required("Nome do paciente é inválido."),
    email: yup.string().email().required("E-mail é inválido."),
    neighborhood: yup.string().required("Nome do bairro é inválido."),
    number: yup.number().positive("Deve ser um valor positivo.").integer("Deve ser um valor inteiro.").required("Número é inválido."),
    city: yup.string().required("Nome da cidade é inválido."),
    state: yup.string().required("Nome do estado é inválido."),
    district: yup.string().required("Endereço é inválido."),
})

export const ModalCreatedPatient: React.FC<IModalCreatedPatient> = ({ open, handleClose, patient, type }) => {
    const { handleSubmit: handleSubmitReactHookForm, control, setValue, reset, formState: { errors } } = useForm<IPatientDate>({
        resolver: yupResolver(schema)
    })
    const { addToast } = useToast()
    const [ isCep, setIsCep ] = useState<string>('')
    const [ isBirthDate, setIsBirthdate ] = useState<Date | null>(null)
    const [ isErrorCep, setIsErrorCep ] = useState<string | null>(null)
    const [ isErrorBirthDate, setIsErrorBirthDate ] = useState<string | null>(null)
    const [ isLoadingSubmit, setIsLoadingSubmit ] = useState(false)
    const { handleSubmit } = usePatient()
    const matches = useMediaQuery('(max-width: 576px)')

    const handleSubmitPatient = useCallback(async (data: IPatient) => {
        try {
            setIsErrorCep(null)
            setIsErrorBirthDate(null)

            if(!isBirthDate) {
                setIsErrorBirthDate("Data de nascimento é inválida.")
                return
            }
            if(isAfter(new Date(isBirthDate), new Date())) {
                setIsErrorBirthDate("Data de nascimento deve ser menor que a data atual.")
                return
            }
            if(isCep.length < 9) {
                setIsErrorCep("CEP é inválido.")
                return
            }
            setIsLoadingSubmit(true)

            if(type === 'create') await handleSubmit(data, type)
            if(type === 'update' && patient && patient.id) {
                await handleSubmit(data, type, patient.id)
            }

            setIsLoadingSubmit(false)
            setIsErrorCep(null)
            setIsErrorBirthDate(null)
            addToast({
                openToast: true,
                description: type === "create" ? "Paciente criado com sucesso." : "Paciente editado com sucesso.",
                type: 'success'
            })
            reset()
            setIsBirthdate(null)
            setIsCep('')
            handleClose()
        } catch(err: any) {
            addToast({
                openToast: true,
                description: JSON.stringify(err.message),
                type: 'error'
            })
            setIsLoadingSubmit(false)
        }
    }, [isBirthDate, isCep, type])
   
    const onSubmit = (data: IPatientDate) => handleSubmitPatient({
        name: data.name,
        email: data.email,
        birth_date: isBirthDate || new Date(),
        address: {
            neighborhood: data.district,
            postcode: isCep,
            city: data.city,
            number: data.number,
            state: data.state,
            district: data.district
        }
    })

    const handleViaCepLoad = useCallback(async (cep: string) => {
        try {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
            const json = await response.json()

            setValue('neighborhood', json.bairro || patient?.address.neighborhood || '')
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
        if(type === 'create') {
            reset()
            setIsCep("")
            setIsBirthdate(null)
        }

        handleClose()
    }, [])

    useEffect(() => {
        if(isCep.length === 9) {
            const [ partOne, partTwo ] = isCep.split('-')
            handleViaCepLoad(`${partOne}${partTwo}`)
        }
    }, [isCep])

    useEffect(() => {
        if(patient) {
            setValue('name', patient.name)
            setValue('email', patient.email)
            setValue('city', patient.address.city)
            setValue('state', patient.address.state)
            setValue('district', patient.address.neighborhood)
            setValue('number', patient.address.number)
            setValue('district', patient.address.district)
            setIsBirthdate(new Date(patient.birth_date))
            setIsCep(patient.address.postcode)
        }
    }, [])

    return (
        <Modal
            onClose={() => handleClose()}
            open={open}
        >
            <Box width="100%" height="100%" display="flex" alignItems="center" justifyContent="center" overflow="auto">
                <Box width="95%" maxWidth={700} bgcolor="#FFF" padding={4} borderRadius={.75} mt={matches ? 30 : 0}> 
                    <Box width="100%" display="flex" justifyContent="space-between" alignItems="center" borderBottom={1} borderColor="secondary.main" paddingBottom={3}>
                        <Typography variant="h6" fontWeight={700} color="primary.dark" >
                            Criar Paciente
                        </Typography>
                        <IconButton onClick={handleClearFileds}>
                            <CloseIcon color="action"/>
                        </IconButton>
                    </Box>
                    <form onSubmit={handleSubmitReactHookForm(onSubmit)}>
                        <Box width="100%" display="flex" flexDirection="column" gap={3} mt={3} className="create-patient"> 
                            <Box display="flex" flexWrap="wrap" justifyContent="space-between">
                                <Box width={matches ? "100%" : "49%"}>
                                    <Controller
                                        name="name"
                                        control={control}
                                        render={({ field: { onChange, value } }) => (
                                            <Input id="name" value={value} type="text" placeholder="Informe o nome do paciente..." Icon={PersonIcon} labelText="Nome" requiredField onChange={onChange} error={!!errors.name} errorText={errors.name?.message} />
                                        )}
                                        />
                                </Box>
                                <Box width={matches ? "100%" : "49%"} mt={matches ? 3 : 0}>
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
                                <Box width={matches ? "100%" : "49%"} mb={3}>
                                    <Input id="cep" name="cep" type="text" placeholder="CEP" Icon={HomeIcon} labelText="CEP" requiredField onChange={(event) => {
                                        if(event.target.value.length > 9) {
                                            return
                                        }
                                        setIsCep(maskCep(event.target.value))
                                    }} value={isCep} error={!!isErrorCep} errorText={isErrorCep} />
                                </Box>
                                <Box width={matches ? "100%" : "49%"} mb={3}>
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
                                            <Input id="district" type="text" placeholder="Endereço" Icon={RoomIcon} labelText="Endereço" requiredField onChange={onChange} value={value} error={!!errors.district} errorText={errors.district?.message} />
                                        )}
                                    />
                                </Box>
                                <Box width="100%" mb={3}>
                                    <Controller
                                        name="neighborhood"
                                        control={control}
                                        render={({ field: { onChange, value } }) => (
                                            <Input id="neighborhood" type="text" placeholder="Bairro" Icon={RoomIcon} labelText="Bairro" requiredField onChange={onChange} value={value} error={!!errors.neighborhood} errorText={errors.neighborhood?.message} />
                                        )}
                                    />
                                </Box>
                                <Box width={matches ? "100%" : "49%"} mb={3}>
                                    <Controller
                                        name="city"
                                        control={control}
                                        render={({ field: { onChange, value } }) => (
                                            <Input id="city" type="text" placeholder="Cidade" Icon={ApartmentIcon} labelText="Cidade" requiredField onChange={onChange} value={value} error={!!errors.city} errorText={errors.city?.message} />
                                        )}
                                    />
                                </Box>
                                <Box width={matches ? "100%" : "49%"} mb={3}>
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
                                    {isLoadingSubmit ? (
                                            <CircularProgress color="secondary" size="24px" />
                                    ) : 'Salvar'}
                                </Typography>
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Box>
        </Modal>
    )
}