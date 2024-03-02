import { Box, Button, Grid, IconButton, InputAdornment, TextField, Typography } from '@mui/material'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import useAuth from '~/hooks/useAuth'
import { post } from '~/utils/api'
import { notifyError, notifySuccess } from '~/utils/toastify'
import { AxiosError } from 'axios'

interface RegisterCardProps {
  toggleCard: () => void
}

export default function RegisterCard({ toggleCard }: RegisterCardProps) {
  const [isVisibleLogin, setIsVisibleLogin] = useState(false)
  const toggleVisibilityLogin = () => setIsVisibleLogin(!isVisibleLogin)

  const initialLoginValues = {
    username: '',
    password: '',
    name: '',
    yob: 1900
  }

  const navigate = useNavigate()
  const { idToken, user } = useAuth()

  const validationLogin = yup.object({
    username: yup
      .string()
      .trim()
      .required('Username cannot be empty')
      .matches(/^[a-zA-Z0-9]+$/, 'Username must be alphanumeric'),
    password: yup
      .string()
      .trim()
      .required('Password cannot be empty')
      .min(6, 'Password must be at least 6 characters long')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{6,}$/g,
        'Password must contain at least 6 characters, one uppercase, one lowercase, one number and one special character'
      ),
    name: yup.string().trim().required('Name cannot be empty'),
    yob: yup.number().required('Year of Birth cannot be empty').min(1900, 'Year of Birth must be at least 1900')
  })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitted }
  } = useForm({
    mode: 'onTouched',
    reValidateMode: 'onChange',
    defaultValues: { ...initialLoginValues },
    resolver: yupResolver(validationLogin),
    criteriaMode: 'all'
  })

  const handleRegister = async (data: { username: string; password: string; name: string; yob: number }) => {
    try {
      await post('/public/register', data)
      notifySuccess('Registerd successfully')
      reset()
      toggleCard()
    } catch (error) {
      if (error instanceof AxiosError) {
        notifyError(error.response?.data.message || 'An error occurred')
      } else {
        notifyError('An unexpected error occurred')
      }
    }
  }

  useEffect(() => {
    if (user?.isAdmin) {
      navigate('/management')
    } else if (idToken) {
      navigate('/')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idToken, handleRegister])

  return (
    <Grid
      container
      spacing={5}
      sx={{ position: 'absolute', backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
    >
      <Grid item xs={12} md={6}>
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Typography sx={{ color: '#677788' }}>SIGN UP</Typography>
          <Typography variant='h4' sx={{ fontWeight: 600 }}>
            Create an account
          </Typography>
          <Typography sx={{ color: '#677788', mb: 3 }}>Fill out the form to get started.</Typography>
          <form action='POST' onSubmit={handleSubmit(handleRegister)}>
            <Box>
              <Typography variant='body2' sx={{ mb: 2 }}>
                Enter your name
              </Typography>
              <TextField
                type='text'
                label='Name'
                variant='outlined'
                placeholder='Name'
                {...register('name')}
                error={!!errors.name}
                helperText={errors.name?.message}
                sx={{ width: '100%', marginBottom: 3 }}
                required
              />
            </Box>
            <Box>
              <Typography variant='body2' sx={{ mb: 2 }}>
                Enter your year of birth
              </Typography>
              <TextField
                type='number'
                label='Year of Birth'
                variant='outlined'
                placeholder='Year of Birth'
                {...register('yob')}
                onBlur={(e) => {
                  if (Number(e.target.value) <= 1900) {
                    e.target.value = '1900'
                  } else if (Number(e.target.value) > new Date().getFullYear()) {
                    e.target.value = new Date().getFullYear().toString()
                  }
                }}
                error={!!errors.yob}
                helperText={errors.yob?.message}
                sx={{ width: '100%', marginBottom: 3 }}
                required
              />
            </Box>
            <Box>
              <Typography variant='body2' sx={{ mb: 2 }}>
                Enter your username
              </Typography>
              <TextField
                type='text'
                label='Username'
                variant='outlined'
                placeholder='Username'
                {...register('username')}
                error={!!errors.username || errors.password?.type === 'loginFailed' ? true : false}
                helperText={errors.username?.message}
                sx={{ width: '100%', marginBottom: 3 }}
                required
              />
            </Box>
            <Box>
              <Typography variant='body2' sx={{ mb: 2 }}>
                Enter your password
              </Typography>

              <TextField
                type={`${isVisibleLogin ? 'text' : 'password'}`}
                label='Password'
                variant='outlined'
                placeholder='Password'
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton onClick={toggleVisibilityLogin}>
                        {isVisibleLogin ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
                {...register('password')}
                error={!!errors.password}
                helperText={errors.password?.message}
                sx={{ width: '100%', marginBottom: 3 }}
                required
              />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex' }}>
                <Typography variant='body2'>Already have an account?</Typography>
                <Typography
                  variant='body2'
                  onClick={() => {
                    reset()
                    toggleCard()
                  }}
                  sx={{
                    cursor: 'pointer',
                    textDecoration: 'underline',
                    ml: 1,
                    color: '#3E55AB'
                  }}
                >
                  Login
                </Typography>
              </Box>
              <Button
                variant='contained'
                type='submit'
                disabled={
                  isSubmitted && (errors.password || errors.username || errors.name || errors.yob) ? true : false
                }
              >
                Sign up
              </Button>
            </Box>
          </form>
        </Box>
      </Grid>
      <Grid item xs={12} md={6} sx={{ display: { xs: 'hidden', md: 'block' } }}>
        <Box>
          <img
            src='https://assets.maccarianagency.com/svg/illustrations/drawkit-illustration4.svg'
            alt='Login'
            style={{ width: '100%', height: '100%' }}
          />
        </Box>
      </Grid>
    </Grid>
  )
}
