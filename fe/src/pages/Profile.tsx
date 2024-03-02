import { Visibility, VisibilityOff } from '@mui/icons-material'
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  Tab,
  Tabs,
  TextField,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useUser from '~/hooks/apis/useUser'
import useAuth from '~/hooks/useAuth'

interface TabPanelProps {
  children?: React.ReactNode
  dir?: string
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`
  }
}

const ProfilePage = () => {
  const { user, update, idToken } = useAuth()
  const [name, setName] = useState(user?.name || '')
  const [yob, setYob] = useState(user?.yob || 1900)
  const [newPassword, setNewPassword] = useState('')
  const [oldPassword, setOldPassword] = useState('')
  const { changePassword } = useUser()
  const navigate = useNavigate()

  const [isVisibleOldPass, setIsVisibleOldPass] = useState(false)
  const toggleVisibilityOldPass = () => setIsVisibleOldPass(!isVisibleOldPass)

  const [isVisibleNewPass, setIsVisibleNewPass] = useState(false)
  const toggleVisibilityNewPass = () => setIsVisibleNewPass(!isVisibleNewPass)

  const theme = useTheme()
  const md = useMediaQuery(theme.breakpoints.down('md'))

  const [value, setValue] = useState(0)

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  useEffect(() => {
    if (idToken) {
      navigate('/profile')
    } else {
      navigate('/login-register')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idToken])

  const changePwd = async (oldPassword: string, newPassword: string) => {
    try {
      await changePassword(oldPassword, newPassword)
      // setOldPassword('')
      // setNewPassword('')
    } catch (error) {
      console.log(error)
    }
  }

  const changeUsr = async (name: string, yob: number) => {
    try {
      await update(user ? user.username : '', name, yob)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Container maxWidth='lg' sx={{ paddingY: 2, minHeight: 'calc(100vh - 64px)' }}>
      {user?.isAdmin ? null : (
        <>
          <Typography variant='h4' fontWeight={700} sx={{ mt: 5 }}>
            Account settings
          </Typography>
          <Typography variant='h5' fontWeight={500} sx={{ mt: 2 }}>
            Change account information and settings
          </Typography>
          <Grid container spacing={3} sx={{ mt: 2 }}>
            <Grid item xs={12} md={2}>
              <Tabs
                orientation={md ? 'horizontal' : 'vertical'}
                variant='fullWidth'
                value={value}
                onChange={handleTabChange}
                aria-label='wrapped label tabs example'
                component={Paper}
                elevation={3}
                sx={{ py: 2 }}
              >
                <Tab {...a11yProps(0)} label='Profile' sx={{ fontWeight: 700 }} />
                <Tab {...a11yProps(1)} label='Security' sx={{ fontWeight: 700 }} />
              </Tabs>
            </Grid>
            <Grid item xs={12} md={10}>
              <TabPanel value={value} index={0}>
                <Paper elevation={3} sx={{ p: 5 }}>
                  <Typography variant='h6' fontWeight={700}>
                    Change your private information
                  </Typography>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant='h6' fontWeight={700}>
                    Name
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 2, mt: 2, width: '100%' }}>
                    <TextField
                      label='Name'
                      value={name}
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setName(event.target.value)
                      }}
                      sx={{ width: '50%' }}
                    />
                    <Button
                      color='error'
                      variant='outlined'
                      onClick={() => {
                        changeUsr(name, yob)
                      }}
                    >
                      Update
                    </Button>
                  </Box>
                  <Typography variant='h6' fontWeight={700} sx={{ mt: 2 }}>
                    Year of birth
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 2, mt: 2, width: '100%' }}>
                    <TextField
                      label='Year of birth'
                      value={yob}
                      type='number'
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setYob(Number(event.target.value))
                      }}
                      sx={{ width: '50%' }}
                    />
                    <Button color='error' variant='outlined' onClick={() => changeUsr(name, yob)}>
                      Update
                    </Button>
                  </Box>
                </Paper>
              </TabPanel>

              <TabPanel value={value} index={1}>
                <Paper elevation={3} sx={{ p: 5 }}>
                  <Typography variant='h6' fontWeight={700}>
                    Change password
                  </Typography>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant='h6' fontWeight={700} sx={{ mt: 2 }}>
                    Password
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                    <TextField
                      label='Old password'
                      type={`${isVisibleOldPass ? 'text' : 'password'}`}
                      value={oldPassword}
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setOldPassword(event.target.value)
                      }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position='end'>
                            <IconButton onClick={toggleVisibilityOldPass}>
                              {isVisibleOldPass ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                      sx={{ width: '33%' }}
                    />
                    <TextField
                      label='New password'
                      type={`${isVisibleNewPass ? 'text' : 'password'}`}
                      value={newPassword}
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setNewPassword(event.target.value)
                      }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position='end'>
                            <IconButton onClick={toggleVisibilityNewPass}>
                              {isVisibleNewPass ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                      sx={{ width: '33%' }}
                    />
                    <Button color='error' variant='outlined' onClick={() => changePwd(oldPassword, newPassword)}>
                      Change
                    </Button>
                  </Box>{' '}
                </Paper>
              </TabPanel>
            </Grid>
          </Grid>
        </>
      )}
    </Container>
  )
}

export default ProfilePage
