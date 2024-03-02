import { ReactNode, createContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { AxiosError } from 'axios'
import { decodeJwt } from 'jose'
import { IAuthContextProps, IAuthFormProps, IUserInfoProps } from '~/interfaces'
import { post, put } from '~/utils/api'
import { notifyError, notifySuccess } from '~/utils/toastify'
const initialContext: IAuthContextProps = {
  user: {
    id: '',
    username: '',
    name: '',
    yob: 0,
    isAdmin: false
  },
  idToken: null,
  login: async () => {},
  logout: async () => {
    return
  },
  update: async () => {},
  loading: false
}

export const AuthContext = createContext<IAuthContextProps>(initialContext)

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [idToken, setIdToken] = useState<string | null>(null)
  const [user, setUser] = useState<IUserInfoProps | undefined>()
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const storedToken = localStorage.getItem('idToken') || ''
    if (storedToken) {
      setIdToken(storedToken)
      const userData = decodeJwt(storedToken)
      setUser({
        id: userData.id as string,
        username: userData.username as string,
        name: userData.name as string,
        yob: userData.yob as number,
        isAdmin: userData.isAdmin as boolean
      })
    }
  }, [])

  useEffect(() => {
    if (location.pathname === '/') navigate(location.pathname)
    else if (location.pathname.includes('detail')) navigate(location.pathname)
    else if (location.pathname === '/profile') navigate(location.pathname)
    else if (idToken) {
      try {
        const decodedToken = decodeJwt(idToken)
        if (decodedToken.exp && decodedToken.exp * 1000 < Date.now()) {
          navigate(location.pathname)
          navigate('/login-register')
        }
      } catch (error) {
        navigate('/login-register')
      }
    } else {
      navigate('/login-register')
    }

    setLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idToken])

  initialContext.login = async ({ username, password }: IAuthFormProps) => {
    try {
      setLoading(true)
      const { data } = await post('/public/login', { username, password }, {}, {})
      const token = data.data
      setIdToken(token)
      const userData = decodeJwt(token)
      setUser({
        id: userData.id as string,
        username: userData.username as string,
        name: userData.name as string,
        yob: userData.yob as number,
        isAdmin: userData.isAdmin as boolean
      })
      localStorage.setItem('idToken', token)
      notifySuccess('Login successfully')
    } catch (error) {
      if (error instanceof AxiosError && error.response && error.response.data) {
        notifyError(error.response.data.message)
      } else {
        notifyError('Error!')
      }
    }
    setLoading(false)
  }

  initialContext.logout = async () => {
    setLoading(true)
    try {
      localStorage.removeItem('idToken')
    } catch (error) {
      console.error()
    }
    setIdToken(null)
    setUser(undefined)
    setLoading(false)
    navigate('/')
  }

  initialContext.update = async (username: string, name: string, yob: number) => {
    try {
      setLoading(true)
      const data = await put(
        '/member/update',
        { username, name, yob },
        {},
        {
          accept: 'application/json',
          Authorization: `Bearer ${idToken ?? localStorage.getItem('idToken')}`
        }
      )
      const token = data.data.data
      setIdToken(token)
      const userData = decodeJwt(token)
      if (userData) notifySuccess('Username updated')
      setUser({
        id: userData.id as string,
        username: userData.username as string,
        name: userData.name as string,
        yob: userData.yob as number,
        isAdmin: userData.isAdmin as boolean
      })
      localStorage.setItem('idToken', token)
    } catch (error) {
      if (error instanceof AxiosError && error.response && error.response.data) {
        notifyError(error.response.data.message)
      } else {
        notifyError('Username existed')
      }
    }
    setLoading(false)
  }

  initialContext.user = user
  initialContext.idToken = idToken
  initialContext.loading = loading
  return <AuthContext.Provider value={initialContext}>{children}</AuthContext.Provider>
}

export default AuthProvider
