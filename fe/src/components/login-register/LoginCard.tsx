import { Box, Button, Grid, IconButton, InputAdornment, TextField, Typography } from '@mui/material'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { IAuthFormProps } from '~/interfaces'
import { useNavigate } from 'react-router-dom'
import useAuth from '~/hooks/useAuth'

interface LoginCardProps {
  toggleCard: () => void
}

export default function LoginCard({ toggleCard }: LoginCardProps) {
  const [isVisibleLogin, setIsVisibleLogin] = useState(false)
  const toggleVisibilityLogin = () => setIsVisibleLogin(!isVisibleLogin)

  const initialLoginValues: IAuthFormProps = {
    username: '',
    password: ''
  }

  const navigate = useNavigate()
  const { idToken, user, login } = useAuth()

  useEffect(() => {
    if (user?.isAdmin) {
      navigate('/management')
    } else if (idToken) {
      navigate('/')
      reset()
    } else {
      isSubmitted && setError('password', { type: 'loginFailed', message: 'Email or Password is incorrect!' })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idToken, login])

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
  })

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitted }
  } = useForm({
    mode: 'onTouched',
    reValidateMode: 'onChange',
    defaultValues: { ...initialLoginValues },
    resolver: yupResolver(validationLogin),
    criteriaMode: 'all'
  })

  return (
    <Grid
      container
      spacing={5}
      sx={{ position: 'absolute', backfaceVisibility: 'hidden', zIndex: 2, transform: 'rotateY(0deg)' }}
    >
      <Grid item xs={12} md={6} sx={{ display: { xs: 'hidden', md: 'block' } }}>
        <Box>
          <img
            src='https://assets.maccarianagency.com/svg/illustrations/drawkit-illustration2.svg'
            alt='Login'
            style={{ width: '100%', height: '100%' }}
          />
        </Box>
      </Grid>
      <Grid item xs={12} md={6}>
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Typography sx={{ color: '#677788' }}>LOGIN</Typography>
          <Typography variant='h4' sx={{ fontWeight: 600 }}>
            Welcome back
          </Typography>
          <Typography sx={{ color: '#677788', mb: 3 }}>Login to manage your account.</Typography>
          <form action='POST' onSubmit={handleSubmit(login)}>
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
                <Typography variant='body2'>Don't have an account yet?</Typography>
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
                  Sign up
                </Typography>
              </Box>
              <Button
                variant='contained'
                type='submit'
                disabled={isSubmitted && (errors.password || errors.username) ? true : false}
              >
                Login
              </Button>
            </Box>
          </form>
        </Box>
      </Grid>
    </Grid>
  )
}
