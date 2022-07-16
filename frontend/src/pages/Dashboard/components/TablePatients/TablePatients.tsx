import React, { useCallback, useState } from 'react';
import { TableContainer, Table, TableHead, TableRow, TableCell, Checkbox, Typography, IconButton, Box, TableBody, Button, Pagination, Modal, Skeleton, useMediaQuery } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import { format } from 'date-fns'
import ptBr from 'date-fns/locale/pt-BR'
import DeleteIcon from '@mui/icons-material/Delete'
import { Options } from './Options'
import { ModalAddress } from './ModalAddress'
import { ModalCreatedPatient } from '../ModalCreatedPatient'
import { usePatient } from '../../../../hooks/usePatient'
import DeleteImage from '../../../../common/assets/delete.svg'
import { useToast } from '../../../../hooks/useToast'
import Empty from '../../../../common/assets/empty.svg'

export const TablePatients: React.FC = () => {
    const [ isOpenModalAddress, setIsOpenModalAddress ] = useState<string>('')
    const [ isOpenModalEdit, setIsOpenModalEdit ] = useState<string>('')
    const [ isIdsChecked, setIsIdsChecked ] = useState<string[]>([])
    const { data, handlePageByOrder, handleDelete, error } = usePatient()
    const [ isOpenModalDelete, setIsOpenModalDelete ] = useState(false)
    const { addToast } = useToast()
    const matches = useMediaQuery('(max-width: 576px)')

    const handleCheckedPatient = useCallback((id: string) => {
        const isFindId = isIdsChecked.find(item => item === id)

        if(!isFindId) {
            setIsIdsChecked([ ...isIdsChecked, id ])
            return
        }

        const isNewIdsChecked = isIdsChecked.filter(item => item !== id)

        setIsIdsChecked(isNewIdsChecked)
    }, [isIdsChecked])

    const handleVerificationIdChecked = useCallback((id: string): boolean => {
        const isFindId = isIdsChecked.find(item => item === id)

        return !!isFindId  
    }, [isIdsChecked])

    const handleCheckedAll = useCallback(() => {
        if(isIdsChecked.length === data?.patients.length) {
            setIsIdsChecked([])
            return
        }

        if(data) {
            const ids = data?.patients.map(item => item.id) as string[]
            setIsIdsChecked(ids)
        }
    }, [isIdsChecked, data])

    const handleDeletePatient = useCallback(async (ids: string[]) => {
        try {
            await handleDelete(ids)

            addToast({
                type: 'info',
                description: 'Pacientes deletados com sucesso',
                openToast: true
            })
            setIsOpenModalDelete(false)
            setIsIdsChecked([])
        } catch(err: any) {
            addToast({
                type: 'error',
                description: JSON.stringify(err.message),
                openToast: true
            })
        }
    }, [isIdsChecked])

    return (
        <TableContainer sx={{
            paddingBottom: 2,
            maxWidth:  matches ? 'calc(100vw - 48px)' : `calc(100vw - 110px - 48px - 48px)`
        }}>
            {!data && !error && (
                <Box width="100%">
                    <Skeleton variant="rectangular" width="100%" height={70} sx={{
                        marginBottom: 2,
                        borderRadius: 1
                    }} animation="wave" />
                    <Skeleton variant="rectangular" width="100%" height={70} sx={{
                        marginBottom: 2,
                        borderRadius: 1
                    }} animation="wave" />
                    <Skeleton variant="rectangular" width="100%" height={70} sx={{
                        marginBottom: 2,
                        borderRadius: 1
                    }} />
                    <Skeleton variant="rectangular" width="100%" height={70} animation="wave" sx={{
                        marginBottom: 2,
                        borderRadius: 1
                    }} />
                    <Skeleton variant="rectangular" width="100%" height={70} animation="wave" sx={{
                        marginBottom: 2,
                        borderRadius: 1
                    }} />
                    <Skeleton variant="rectangular" width="100%" height={70} animation="wave" sx={{
                        marginBottom: 2,
                        borderRadius: 1
                    }} />
                </Box>
            )}
            {data && !error && (
                <>
                    {data.patients.length <= 0 && (
                        <Box width="100%" height="100%" display="flex" flexDirection="column" alignItems="center" padding={4} paddingTop={10} gap={matches ? 3 : 6}>
                            <img src={Empty} alt="Vazio" style={{ maxWidth: '100%' }} />
                            <Typography variant={matches ? 'h4' : 'h2'} color="primary.dark" fontWeight={600} textAlign="center">
                                Nenhum paciente cadastrado.
                            </Typography>
                            <Typography variant={matches ? 'body1' : 'h6'} color="secondary.dark" fontWeight={400} textAlign="center">
                                Adicione um novo paciente clicando no botão <b>“NOVO PACIENTE”</b>
                            </Typography>
                        </Box>
                    )}
                    {data.patients && data.patients.length > 0 && (
                        <React.Fragment>
                            <Modal open={isOpenModalDelete} onClose={() => setIsOpenModalDelete(false)}>
                                <Box width="100%" height="100%" display="flex" alignItems="center" justifyContent="center">
                                    <Box display="flex" flexDirection="column" bgcolor="#FFF" maxWidth={350} padding={3} borderRadius={.75}>
                                        <Box textAlign="center">
                                            <img src={DeleteImage} alt="Deletar paciente" style={{ width: 200 }} />
                                        </Box>
                                        <Typography variant='body1' color="primary.dark" textAlign="center" mt={3}>
                                            Tem certeza que deseja excluir, porque esse processo é irreversível.
                                        </Typography>
                                        <Box display="flex" alignItems="center" justifyContent="center" gap={1} mt={6}>
                                            <Button variant='text' onClick={() => setIsOpenModalDelete(false)} sx={{
                                                backgroundColor: 'primary.main',
                                                ":hover": {
                                                    backgroundColor: '#0B39B9'
                                                }
                                            }}>
                                                <Typography variant='body1' paddingY={1} paddingX={2} color="#FFF">
                                                    Cancelar
                                                </Typography>
                                            </Button>
                                            <Button color="error" onClick={() => handleDeletePatient(isIdsChecked)}>
                                                <Typography color="secondary.dark" variant='body1' paddingY={1} paddingX={3}>
                                                    Excluir
                                                </Typography>
                                            </Button>
                                        </Box>
                                    </Box>
                                </Box>
                            </Modal>
                            <Box display="flex" width="100%" gap={2} alignItems="center">
                                {data.search && (
                                    <Box mb={4} height="33px">
                                        <Typography variant="body1" pt={0.3} color="secondary.dark">
                                            {data.patients.length}{' '}
                                            paciente encontrados
                                        </Typography>
                                    </Box>
                                )}
                                {isIdsChecked && isIdsChecked.length> 0 && (
                                    <Box width={200}>
                                        <Button variant='text' fullWidth color='error' onClick={() => setIsOpenModalDelete(true)}>
                                            <Typography sx={{
                                                color: 'red'
                                            }} variant="body2" display="flex" alignItems="center" gap={.6} paddingY={1} fontWeight={400}>
                                                <DeleteIcon fontSize='small' />
                                                <Typography variant="body2" pt={.3}>
                                                    Deletar {' '}{isIdsChecked.length}{' '} {isIdsChecked.length > 1 ? 'Pacientes' : 'Paciente'}
                                                </Typography>
                                            </Typography>
                                        </Button>
                                    </Box>
                                )}
                                {data.totalPage > 1 && (
                                    <Box width="100%" display="flex" justifyContent="flex-end" mb={4}>
                                        <Pagination count={data.totalPage} variant="outlined" color='primary' shape="rounded" onChange={(event: React.ChangeEvent<unknown>, value) => handlePageByOrder(value, data.orderBy === "DESC" ? 'desc' : 'asc')} page={data.currentPage} />
                                    </Box>
                                )}
                            </Box>
                            <Table>
                                <TableHead>
                                    <TableRow sx={{ backgroundColor: 'secondary.light' }} >
                                        <TableCell width="2%" sx={{ border: 'none' }}>
                                            <Checkbox onClick={handleCheckedAll} checked={data.patients.length === isIdsChecked.length} />
                                        </TableCell>
                                        <TableCell sx={{ border: 'none' }}>
                                            <Box display="flex" alignItems="center" justifyContent="space-between" paddingX={1}>
                                                <Typography variant='body1' color="primary.dark" fontWeight={400}>
                                                    Nome
                                                </Typography>
                                                {!data.search && (
                                                    <IconButton onClick={() => handlePageByOrder(data.currentPage, data.orderBy === "ASC" ? "desc" : 'asc')}>
                                                    {data.orderBy === 'DESC' ? (
                                                            <KeyboardArrowUpIcon color="action" />
                                                        ) : (
                                                            <KeyboardArrowDownIcon color="action" />
                                                        )}
                                                    </IconButton>
                                                )}
                                            </Box>
                                        </TableCell>
                                        <TableCell sx={{ border: 'none' }}>
                                            <Box display="flex" alignItems="center" justifyContent="space-between" paddingX={2}>
                                                <Typography variant='body1' color="primary.dark" fontWeight={400}>
                                                    E-mail
                                                </Typography>
                                            </Box>
                                        </TableCell>
                                        <TableCell sx={{ border: 'none' }}>
                                            <Box display="flex" alignItems="center" justifyContent="space-between" paddingX={2}>
                                                <Typography variant='body1' color="primary.dark" fontWeight={400}>
                                                    Data de aniversário
                                                </Typography>
                                            </Box>
                                        </TableCell>
                                        <TableCell sx={{ border: 'none' }}>
                                            <Box display="flex" alignItems="center" justifyContent="space-between" paddingX={2}>
                                                <Typography variant='body1' color="primary.dark" fontWeight={400}>
                                                    Endereço
                                                </Typography>
                                            </Box>
                                        </TableCell>
                                        <TableCell sx={{ border: 'none' }} width="5%" />
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {data.patients.map(({ name, email, birth_date, address, id }) => (
                                        <TableRow sx={{ 
                                            cursor: 'pointer'
                                        }} key={id}>
                                            <TableCell width="2%" sx={{ border: 'none' }}>
                                                <Checkbox onClick={() => handleCheckedPatient(id || '')} checked={handleVerificationIdChecked(id || '')} />
                                            </TableCell>
                                            <TableCell sx={{ border: 'none' }}>
                                                <Box display="flex" alignItems="center" justifyContent="space-between" paddingX={2}>
                                                    <Typography variant='body1' color="secondary.dark" fontWeight={400}>
                                                        {name}
                                                    </Typography>
                                                </Box>
                                            </TableCell>
                                            <TableCell sx={{ border: 'none' }}>
                                                <Box display="flex" alignItems="center" justifyContent="space-between" paddingX={2}>
                                                    <Typography variant='body1' color="secondary.dark" fontWeight={400}>
                                                        {email}
                                                    </Typography>
                                                </Box>
                                            </TableCell>
                                            <TableCell sx={{ border: 'none' }}>
                                                <Box display="flex" alignItems="center" justifyContent="space-between" paddingX={2}>
                                                    <Typography variant='body1' color="secondary.dark" fontWeight={400}>
                                                        {format(new Date(birth_date), "dd' de 'MMMM' de 'yyyy",{
                                                            locale: ptBr
                                                        })}
                                                    </Typography>
                                                </Box>
                                            </TableCell>
                                            <TableCell sx={{ border: 'none' }}>
                                                <Box display="flex" alignItems="center" justifyContent="space-between" paddingX={2}>
                                                    <Button variant='text' sx={{
                                                        backgroundColor: 'primary.main',
                                                        height: 32,
                                                        width: 134,
                                                        ":hover": {
                                                            backgroundColor: '#0A39B9'
                                                        }
                                                    }} onClick={() => setIsOpenModalAddress(id || '')}>
                                                        <Typography variant='body2' fontWeight={400} textTransform="uppercase" color="#FFF" display="flex" alignItems="center" gap={.75}>
                                                            <RemoveRedEyeIcon fontSize="small" />
                                                            ver endereço
                                                        </Typography>
                                                    </Button>
                                                </Box>
                                                <ModalAddress address={address} open={isOpenModalAddress === id} handleClose={() => setIsOpenModalAddress('')} />
                                            </TableCell>
                                            <TableCell sx={{ border: 'none' }} width="5%">
                                                <Options  handleFindPatient={() => setIsOpenModalEdit(id || '')} handleDelete={() => {
                                                    setIsOpenModalDelete(true)
                                                    setIsIdsChecked([])
                                                    setIsIdsChecked([id || ''])
                                                }} />
                                            </TableCell>
                                            <ModalCreatedPatient open={isOpenModalEdit === id} patient={{ address, birth_date, name, email, id }} handleClose={() => setIsOpenModalEdit('')} type="update" />
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </React.Fragment>
                    )}
                </>
            )}
            {error && (
                <Box width="100%" height="100%" display="flex" flexDirection="column" alignItems="center" padding={4} paddingTop={10} gap={6}>
                    <img src={Empty} alt="Vazio" />
                    <Typography variant='h2' color="primary.dark" fontWeight={600} textAlign="center">
                        Nenhum paciente cadastrado.
                    </Typography>
                    <Typography variant='h6' color="secondary.dark" fontWeight={400}>
                        Adicione um novo paciente clicando no botão <b>“NOVO PACIENTE”</b>
                    </Typography>
                </Box>
            )}
        </TableContainer>
    )
}