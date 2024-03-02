/* eslint-disable react-hooks/exhaustive-deps */
import { Check } from '@mui/icons-material'
import { MRT_ColumnDef, MaterialReactTable } from 'material-react-table'
import { useEffect, useMemo, useState } from 'react'
import useOrchid from '~/hooks/apis/useOrchid'
import { ICategoryList, IOrchidDetail, IOrchidRequest } from '~/interfaces'
import UpdateOrchidModal from '../modal/UpdateOrchidModal'
import DeleteOrchidModal from '../modal/DeleteOrchidModal'
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
  TextField,
  Typography
} from '@mui/material'
import { notifyError } from '~/utils/toastify'
import moment from 'moment'
import { modalStyle } from '~/utils'
import useCategory from '~/hooks/apis/useCategory'

export default function OrchidDashboard() {
  const { getAllOrchidsAdmin, updateOrchid, deleteOrchid } = useOrchid()
  const [orchids, setOrchids] = useState<IOrchidDetail[]>([])
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    setOpen(false)
    setNewOrchid({
      name: '',
      category: '',
      image: '',
      isNatural: false,
      origin: ''
    })
  }
  const { createOrchid } = useOrchid()
  const { getAllCategories } = useCategory()
  const [categoryList, setCategoryList] = useState<ICategoryList[]>([])
  const [newOrchid, setNewOrchid] = useState<IOrchidRequest>({
    name: '',
    category: '',
    image: '',
    isNatural: false,
    origin: ''
  })

  const getAllCate = async () => {
    try {
      const response = await getAllCategories()
      setCategoryList(response)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAllCate()
    return () => {}
  }, [])

  const handleChangeData = async (event: React.ChangeEvent<HTMLInputElement>, isNatural = false) => {
    setNewOrchid((prevState) => {
      return {
        ...prevState,
        [event.target.name]: isNatural ? event.target.checked : event.target.value
      }
    })
  }

  const isValid: boolean = Boolean(
    newOrchid.name === '' || newOrchid.category === '' || newOrchid.image === '' || newOrchid.origin === ''
  )

  const orchidColumns = useMemo<MRT_ColumnDef<IOrchidDetail>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Name'
      },
      {
        accessorKey: 'category.name',
        header: 'Category name'
      },
      {
        accessorKey: 'image',
        header: 'Image',
        Cell(props) {
          return (
            <img
              src={props.row.original.image}
              alt={props.row.original.name}
              style={{ width: '100px', aspectRatio: 1 / 1 }}
            />
          )
        }
      },
      {
        accessorKey: 'isNatural',
        header: 'Is natural?',
        Cell(props) {
          return props.row.original.isNatural ? <Check /> : null
        },
        maxSize: 50
      },
      {
        accessorKey: 'origin',
        header: 'Origin'
      },
      {
        accessorKey: 'createdAt',
        header: 'Created at',
        accessorFn(originalRow) {
          return moment(originalRow.createdAt).format('DD-MM-YYYY')
        },
        maxSize: 150
      },
      {
        accessorKey: 'updatedAt',
        header: 'Updated at',
        accessorFn(originalRow) {
          return moment(originalRow.updatedAt).format('DD-MM-YYYY')
        },
        maxSize: 150
      },
      {
        header: 'Action',
        enableColumnActions: false,
        Cell(props) {
          return (
            <>
              <UpdateOrchidModal
                data={{
                  name: props.row.original.name,
                  category: props.row.original.category._id,
                  image: props.row.original.image,
                  isNatural: props.row.original.isNatural,
                  origin: props.row.original.origin
                }}
                orchidId={props.row.original._id}
                handleUpdateOrchid={handleUpdateOrchid}
              />
              <DeleteOrchidModal
                orchidName={props.row.original.name}
                orchidId={props.row.original._id}
                handleDeleteOrchid={handleDeleteOrchid}
              />
            </>
          )
        },
        maxSize: 150
      }
    ],
    []
  )

  const getAllOrchids = async () => {
    try {
      const response = await getAllOrchidsAdmin()
      setOrchids(response)
    } catch (error) {
      notifyError('Error')
    }
  }

  useEffect(() => {
    getAllOrchids()
    return () => {}
  }, [])

  const handleCreateOrchid = async (newOrchid: IOrchidRequest) => {
    try {
      await createOrchid(newOrchid)
      handleClose()
      await getAllOrchids()
      setNewOrchid({
        name: '',
        category: '',
        image: '',
        isNatural: false,
        origin: ''
      })
    } catch (error) {
      notifyError('Error')
    }
  }

  const handleUpdateOrchid = async (updateOrchidData: IOrchidRequest, orchidId: string) => {
    try {
      await updateOrchid(orchidId, updateOrchidData)
      await getAllOrchids()
    } catch (error) {
      notifyError('Error')
    }
  }

  const handleDeleteOrchid = async (orchidId: string) => {
    try {
      await deleteOrchid(orchidId)
      await getAllOrchids()
    } catch (error) {
      notifyError('Error')
    }
  }

  return (
    <Box sx={{ mt: 2 }}>
      <Button onClick={handleOpen} sx={{ mb: 2, fontWeight: 600 }} variant='outlined'>
        Create new orchid
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={modalStyle}>
          <Typography textAlign='center' id='modal-modal-title' variant='h6' component='h2'>
            Create new orchid
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <TextField name='name' onChange={handleChangeData} label='Orchid name' />
            <Select
              onChange={(event: SelectChangeEvent<string>) => {
                setNewOrchid((prevState) => {
                  return {
                    ...prevState,
                    category: event.target.value
                  }
                })
              }}
              name='category'
              label='Category'
            >
              {categoryList.map((value: ICategoryList) => (
                <MenuItem key={value._id} value={value._id}>
                  {value.name}
                </MenuItem>
              ))}
            </Select>
            <FormControlLabel
              name='isNatural'
              control={<Checkbox onChange={(event) => handleChangeData(event, true)} />}
              label='Is natural?'
            />
            <TextField name='origin' onChange={handleChangeData} label='Orchid origin' />
            <TextField name='image' onChange={handleChangeData} label='Orchid image' />
          </Box>
          <Box sx={{ display: 'flex', m: 2, gap: 5, justifyContent: 'center' }}>
            <Button disabled={isValid} variant='contained' onClick={() => handleCreateOrchid(newOrchid)}>
              Create
            </Button>
            <Button color='error' variant='outlined' onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
      <MaterialReactTable data={orchids} columns={orchidColumns} />
    </Box>
  )
}
