import { Search } from '@mui/icons-material'
import { InputAdornment, TextField } from '@mui/material'
import { memo, useEffect } from 'react'

const SEARCH_WAITING_DURATION = 100

let searchTimeout: NodeJS.Timeout

interface OrchidSearchBarProps {
  onSearch: (value: string) => void
}

export default memo(function OrchidSearchBar({ onSearch }: OrchidSearchBarProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    clearTimeout(searchTimeout)
    searchTimeout = setTimeout(() => {
      onSearch(event.target.value)
    }, SEARCH_WAITING_DURATION)
  }

  useEffect(() => {
    return clearTimeout(searchTimeout)
  }, [])

  return (
    <TextField
      type='text'
      label='Search'
      variant='outlined'
      placeholder='Orchid name'
      InputProps={{
        endAdornment: (
          <InputAdornment position='end'>
            <Search />
          </InputAdornment>
        )
      }}
      onChange={handleChange}
      sx={{ width: '100%', marginBottom: 3 }}
    />
  )
})
