import { Link } from 'react-router-dom'
import OrchidCard from './OrchidCard'
import { Grid } from '@mui/material'
import { IOrchid } from '~/interfaces'

interface OrchidListProps {
  orchids: IOrchid[]
}

export default function OrchidList({ orchids }: OrchidListProps) {
  return (
    <>
      <Grid container spacing={4}>
        {orchids.map((orchid) => (
          <Grid item xs={12} sm={6} md={4} key={orchid._id}>
            <Link to={`/orchid/${orchid.slug}`}>
              <OrchidCard orchid={orchid} />
            </Link>
          </Grid>
        ))}
      </Grid>
    </>
  )
}
