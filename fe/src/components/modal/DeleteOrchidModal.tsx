import { Delete } from '@mui/icons-material'
import { Box, Button, IconButton, Modal, Typography } from '@mui/material'
import { useState } from 'react'

import { modalStyle } from '~/utils'

const DeleteOrchidModal = ({
  orchidId,
  orchidName,
  handleDeleteOrchid
}: {
  orchidId: string
  orchidName: string
  handleDeleteOrchid: (orchidId: string) => void
}) => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <>
      <IconButton onClick={handleOpen}>
        <Delete color='error' />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={modalStyle}>
          <Typography textAlign='center' id='modal-modal-title' variant='h6' component='h2'>
            Are you sure you want to delete '{orchidName}'
          </Typography>
          <Box sx={{ display: 'flex', m: 2, gap: 5, justifyContent: 'center' }}>
            <Button
              color='error'
              variant='outlined'
              onClick={() => {
                handleClose()
                handleDeleteOrchid(orchidId)
              }}
            >
              Yes
            </Button>
            <Button color='error' variant='contained' onClick={handleClose}>
              No
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  )
}

export default DeleteOrchidModal
