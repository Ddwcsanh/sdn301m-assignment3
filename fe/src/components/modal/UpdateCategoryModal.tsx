import { Edit } from '@mui/icons-material'
import { Box, Button, IconButton, Modal, TextField, Typography } from '@mui/material'
import { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
import { modalStyle } from '~/utils'

const UpdateCategoryModal = ({
  categoryId,
  categoryName,
  handleModal
}: {
  categoryId: string
  categoryName: string
  handleModal: (categoryId: string, newCategoryName: string) => void
}) => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const [newCategory, setNewCategory] = useState(categoryName)
  return (
    <>
      <IconButton onClick={handleOpen}>
        <Edit />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={modalStyle}>
          <Typography textAlign='center' id='modal-modal-title' variant='h6' component='h2'>
            {categoryName}
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <TextField
              name='category'
              value={newCategory}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setNewCategory(event.target.value)
              }}
            />
          </Box>
          <Box sx={{ display: 'flex', m: 2, gap: 5, justifyContent: 'center' }}>
            <Button
              disabled={categoryName === newCategory}
              variant='contained'
              onClick={() => {
                handleModal(categoryId, newCategory)
                handleClose()
              }}
            >
              Update
            </Button>
            <Button color='error' variant='outlined' onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  )
}

export default UpdateCategoryModal
