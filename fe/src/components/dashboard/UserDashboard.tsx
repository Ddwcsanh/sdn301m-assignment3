/* eslint-disable react-hooks/exhaustive-deps */
import { Check } from '@mui/icons-material'
import { Box, Button, Checkbox, FormControlLabel, Modal, TextField, Typography } from '@mui/material'
import { MRT_ColumnDef, MaterialReactTable } from 'material-react-table'
import moment from 'moment'
import { useEffect, useMemo, useState } from 'react'
import useUser from '~/hooks/apis/useUser'
import { IUserList, IUserRequest } from '~/interfaces'
import { notifyError, notifySuccess } from '~/utils/toastify'
import { modalStyle } from '~/utils'

export default function UserDashboard() {
  const [users, setUsers] = useState<IUserList[]>([])
  const { getUsers } = useUser()
  const [loading, setLoading] = useState(false)

  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    setOpen(false)
    setNewUser({
      username: '',
      password: '',
      name: '',
      yob: 0,
      isAdmin: false
    })
  }
  const { createUser } = useUser()
  const [newUser, setNewUser] = useState<IUserRequest>({
    username: '',
    password: '',
    name: '',
    yob: 0,
    isAdmin: false
  })

  const handleCreateUser = async () => {
    try {
      const result = await createUser(newUser)
      if (result) {
        handleClose()
        getAllUser()
        notifySuccess('User created')
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleChangeData = async (event: React.ChangeEvent<HTMLInputElement>, isAdmin = false) => {
    setNewUser((prevState) => {
      return {
        ...prevState,
        [event.target.name]: isAdmin ? event.target.checked : event.target.value
      }
    })
  }

  const isValid: boolean = Boolean(
    newUser.username === '' || newUser.password === '' || newUser.name === '' || newUser.yob === 0
  )

  const getAllUser = async () => {
    try {
      const response = await getUsers()
      setUsers(response)
    } catch (error) {
      notifyError('Error')
    }
  }

  useEffect(() => {
    setLoading(true)
    getAllUser()
    setLoading(false)
    return () => {}
  }, [])

  const userColumns = useMemo<MRT_ColumnDef<IUserList>[]>(
    () => [
      {
        accessorKey: 'username',
        header: 'Username'
      },
      {
        accessorKey: 'name',
        header: 'Name'
      },
      {
        accessorKey: 'yob',
        header: 'Year of birth'
      },
      {
        accessorKey: 'isAdmin',
        header: 'Is admin?',
        Cell(props) {
          return props.row.original.isAdmin ? <Check /> : null
        },
        size: 5
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
      }
    ],
    []
  )
  return (
    <Box sx={{ mt: 2 }}>
      <Button onClick={handleOpen} sx={{ mb: 2, fontWeight: 600 }} variant='outlined'>
        Create new user
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
            <TextField name='name' onChange={handleChangeData} label='Name' />
            <TextField name='yob' type='number' defaultValue={1900} onChange={handleChangeData} label='Year of birth' />
            <TextField name='username' onChange={handleChangeData} label='Username' />
            <TextField name='password' onChange={handleChangeData} label='Password' />
            <FormControlLabel
              name='isAdmin'
              control={<Checkbox onChange={(event) => handleChangeData(event, true)} />}
              label='Is admin?'
            />
          </Box>
          <Box sx={{ display: 'flex', m: 2, gap: 5, justifyContent: 'center' }}>
            <Button disabled={isValid} variant='contained' onClick={handleCreateUser}>
              Create
            </Button>
            <Button variant='outlined' color='error' onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
      <MaterialReactTable
        data={users}
        columns={userColumns}
        state={{
          isLoading: loading
        }}
      />
    </Box>
  )
}
