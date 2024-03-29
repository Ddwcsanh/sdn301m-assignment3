import { useCallback } from 'react'
import useApi from './useApi'
import { notifySuccess } from '~/utils/toastify'

const useCategory = () => {
  const callApi = useApi()
  const rootEndpoint = '/categories'

  const getAllCategories = useCallback(async () => {
    const endpoint = `${rootEndpoint}`
    try {
      const response = await callApi('get', endpoint)
      return response.data
    } catch (error) {
      console.log(error)
    }
  }, [callApi])

  const deleteCategory = useCallback(
    async (categoryId: string) => {
      const endpoint = `${rootEndpoint}/${categoryId}`
      try {
        const response = await callApi('delete', endpoint)
        if (response?.data) {
          notifySuccess('Category deleted successfully')
          return response.data
        }
      } catch (error) {
        console.log(error)
      }
    },
    [callApi]
  )

  const updateCategory = useCallback(
    async (categoryId: string, categoryName: string) => {
      const endpoint = `${rootEndpoint}/${categoryId}`
      try {
        const response = await callApi('put', endpoint, {}, {}, { name: categoryName })
        if (response?.data) {
          notifySuccess('Category updated successfully')
          return response.data
        }
      } catch (error) {
        console.log(error)
      }
    },
    [callApi]
  )

  const createCategory = useCallback(
    async (categoryName: string) => {
      try {
        const response = await callApi('post', rootEndpoint, {}, {}, { name: categoryName })
        if (response?.data) {
          notifySuccess('Category created successfully')
          return response.data
        }
      } catch (error) {
        console.log(error)
      }
    },
    [callApi]
  )
  return { getAllCategories, deleteCategory, updateCategory, createCategory }
}

export default useCategory
