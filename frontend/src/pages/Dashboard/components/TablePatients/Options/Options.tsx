import * as React from 'react'
import { Popover, Typography, IconButton, Box, MenuItem } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { IOptions } from './interface'

export const Options: React.FC<IOptions> = ({ handleFindPatient, handleDelete }) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  return (
    <div>
        <IconButton aria-describedby={id} onClick={handleClick}>
                <MoreVertIcon />
        </IconButton>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Box>
            <MenuItem onClick={() => {
                handleFindPatient()
                handleClose()
            }}>
                <Typography variant='body1' color="secondary.dark" display="flex" alignItems="center" fontWeight={500} paddingX={1} paddingY={1} gap={1} width={120}>
                    <EditIcon fontSize='small' />
                    Editar
                </Typography>
            </MenuItem>
            <MenuItem>
                <Typography variant='body1' color="error" display="flex" alignItems="center" fontWeight={400} paddingX={1} paddingY={1} gap={1} width={120} onClick={() => {
                    handleDelete()
                    handleClose()
                }}>
                    <DeleteIcon fontSize='small' />
                    Excluir
                </Typography>
            </MenuItem>
        </Box>
      </Popover>
    </div>
  )
}