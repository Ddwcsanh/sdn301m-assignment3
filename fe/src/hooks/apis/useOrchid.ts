import { useCallback } from 'react'
import useApi from './useApi'
import { IOrchidRequest } from '~/interfaces'
import { notifySuccess } from '~/utils/toastify'

const useOrchid = () => {
  const callApi = useApi()
  const rootEndpoint = '/public'
  const adminEndpoint = '/orchid'

  const getAllOrchids = useCallback(async () => {
    const endpoint = `${rootEndpoint}`
    try {
      const response = await callApi('get', endpoint)
      return response.data
    } catch (error) {
      console.log(error)
    }
  }, [callApi])

  const getOrchidDetail = useCallback(
    async (slug: string) => {
      const endpoint = `${rootEndpoint}/${slug}`
      try {
        const response = await callApi('get', endpoint)
        return response.data
      } catch (error) {
        console.log(error)
      }
    },
    [callApi]
  )

  const searchOrchid = useCallback(
    async (search: string) => {
      const endpoint = `${rootEndpoint}/search?name=${search}`
      try {
        const response = await callApi('get', endpoint)
        return response.data
      } catch (error) {
        console.log(error)
      }
    },
    [callApi]
  )

  const getAllOrchidsAdmin = useCallback(async () => {
    const endpoint = `${adminEndpoint}`
    try {
      const response = await callApi('get', endpoint)
      return response.data
    } catch (error) {
      console.log(error)
    }
  }, [callApi])

  const createOrchid = useCallback(
    async (data: IOrchidRequest) => {
      try {
        const response = await callApi('post', adminEndpoint, {}, {}, data)
        if (response?.data) {
          notifySuccess('Orchid created successfully')
          return response.data
        }
      } catch (error) {
        console.log(error)
      }
    },
    [callApi]
  )

  const updateOrchid = useCallback(
    async (orchidId: string, data: IOrchidRequest) => {
      const endpoint = `${adminEndpoint}/${orchidId}`
      try {
        const response = await callApi('put', endpoint, {}, {}, data)
        if (response?.data) {
          notifySuccess('Orchid updated successfully')
          return response.data
        }
      } catch (error) {
        console.log(error)
      }
    },
    [callApi]
  )

  const deleteOrchid = useCallback(
    async (orchidId: string) => {
      const endpoint = `${adminEndpoint}/${orchidId}`
      try {
        const response = await callApi('delete', endpoint)
        if (response?.data) {
          notifySuccess('Orchid deleted successfully')
          return response.data
        }
      } catch (error) {
        console.log(error)
      }
    },
    [callApi]
  )

  return { getAllOrchids, getOrchidDetail, searchOrchid, getAllOrchidsAdmin, createOrchid, updateOrchid, deleteOrchid }
}

export default useOrchid
