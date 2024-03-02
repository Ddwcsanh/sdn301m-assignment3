/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Button, Modal, TextField, Typography } from '@mui/material'
import { MRT_ColumnDef, MaterialReactTable } from 'material-react-table'
import UpdateCategoryModal from '../modal/UpdateCategoryModal'
import DeleteCategoryModal from '../modal/DeleteCategoryModal'
import moment from 'moment'
import { ICategoryList } from '~/interfaces'
import { useEffect, useMemo, useState } from 'react'
import { notifyError } from '~/utils/toastify'
import useCategory from '~/hooks/apis/useCategory'
import { modalStyle } from '~/utils'

export default function CategoriesDashboard() {
  const { getAllCategories, createCategory, updateCategory, deleteCategory } = useCategory()
  const [categories, setCategories] = useState<ICategoryList[]>([])
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const [newCategory, setNewCategory] = useState('')

  const handleCreateCategory = async () => {
    try {
      await createCategory(newCategory)
      handleClose()
      getCategories()
      setNewCategory('')
    } catch (error) {
      notifyError('Error')
    }
  }

  const handleUpdateCategory = async (categoryId: string, newCategoryName: string) => {
    try {
      await updateCategory(categoryId, newCategoryName)
      getCategories()
    } catch (error) {
      notifyError('Error')
    }
  }

  const handleDeleteCategory = async (categoryId: string) => {
    try {
      await deleteCategory(categoryId)
      getCategories()
    } catch (error) {
      notifyError('Error')
    }
  }

  const getCategories = async () => {
    try {
      const response = await getAllCategories()
      setCategories(response)
    } catch (error) {
      notifyError('Error')
    }
  }

  useEffect(() => {
    getCategories()
    return () => {}
  }, [])

  const categoryColumns = useMemo<MRT_ColumnDef<ICategoryList>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Category name'
      },
      {
        accessorKey: 'createdAt',
        header: 'Created at',
        accessorFn(originalRow) {
          return moment(originalRow.createdAt).format('DD-MM-YYYY HH:mm:ss')
        }
      },
      {
        accessorKey: 'updatedAt',
        header: 'Updated at',
        accessorFn(originalRow) {
          return moment(originalRow.updatedAt).format('DD-MM-YYYY HH:mm:ss')
        }
      },
      {
        header: 'Action',
        enableColumnActions: false,
        Cell(props) {
          return (
            <>
              <UpdateCategoryModal
                categoryId={props.row.original._id}
                categoryName={props.row.original.name}
                handleModal={handleUpdateCategory}
              />
              <DeleteCategoryModal
                categoryId={props.row.original._id}
                categoryName={props.row.original.name}
                handleModal={handleDeleteCategory}
              />
            </>
          )
        },
        maxSize: 10
      }
    ],
    []
  )
  return (
    <Box sx={{ mt: 2 }}>
      <Button onClick={handleOpen} sx={{ mb: 2, fontWeight: 600 }} variant='outlined'>
        Create new category
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={modalStyle}>
          <Typography textAlign='center' id='modal-modal-title' variant='h6' component='h2'>
            Create new category
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <TextField
              name='category'
              value={newCategory}
              label='Category name'
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setNewCategory(event.target.value)
              }}
            />
          </Box>
          <Box sx={{ display: 'flex', m: 2, gap: 5, justifyContent: 'center' }}>
            <Button variant='contained' disabled={!newCategory} onClick={handleCreateCategory}>
              Create
            </Button>
            <Button color='error' variant='outlined' onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
      <MaterialReactTable data={categories} columns={categoryColumns} />
    </Box>
  )
}
