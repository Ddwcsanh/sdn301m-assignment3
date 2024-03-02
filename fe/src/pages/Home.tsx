import { Container } from '@mui/material'
import { useEffect, useState } from 'react'
import OrchidList from '~/components/home/OrchidList'
import OrchidSearch from '~/components/home/OrchidSearch'
import useOrchid from '~/hooks/apis/useOrchid'
import { IOrchid } from '~/interfaces'

export default function HomePage() {
  const [orchids, setOrchids] = useState<IOrchid[]>([])
  const { getAllOrchids, searchOrchid } = useOrchid()
  const [search, setSearch] = useState<string>('')

  const handleSearch = (value: string) => {
    setSearch(value)
  }

  useEffect(() => {
    const getData = async () => {
      const orchid = search ? await searchOrchid(search) : await getAllOrchids()
      setOrchids(orchid)
    }

    getData()
    return () => {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search])

  return (
    <Container maxWidth='lg' sx={{ paddingY: 6 }}>
      <OrchidSearch onSearch={handleSearch} />
      <OrchidList orchids={orchids} />
    </Container>
  )
}
