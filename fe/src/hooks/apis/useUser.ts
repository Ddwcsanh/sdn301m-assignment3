import { useCallback } from 'react'
import useApi from './useApi'
import { notifySuccess } from '~/utils/toastify'

const useUser = () => {
  const callApi = useApi()
  const rootEndpoint = '/member'
  const adminEndpoint = '/accounts'

  const changePassword = useCallback(
    async (oldPassword: string, newPassword: string) => {
      const endpoint = `${rootEndpoint}/password-change`
      try {
        const data = await callApi('put', endpoint, {}, {}, { oldPassword, newPassword })
        if (data) notifySuccess('Password changed')
      } catch (error) {
        console.log(error)
      }
    },
    [callApi]
  )

  const createUser = useCallback(
    async ({
      username,
      password,
      name,
      yob,
      isAdmin
    }: {
      username: string
      password: string
      name: string
      yob: number
      isAdmin: boolean
    }) => {
      try {
        const data = await callApi('post', adminEndpoint, {}, {}, { username, password, name, yob, isAdmin })
        if (data) return data
      } catch (error) {
        console.log(error)
      }
    },
    [callApi]
  )

  const getUsers = useCallback(async () => {
    try {
      const response = await callApi('get', adminEndpoint)
      return response.data
    } catch (error) {
      console.log(error)
    }
  }, [callApi])

  return { changePassword, getUsers, createUser }
}

export default useUser
