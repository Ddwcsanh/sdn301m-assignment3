import { CardContent, CardMedia, Paper, Typography } from '@mui/material'
import { IOrchid } from '~/interfaces'

interface OrchidCardProps {
  orchid: IOrchid
}

export default function OrchidCard({ orchid }: OrchidCardProps) {
  return (
    <Paper
      square={false}
      elevation={6}
      sx={{
        maxWidth: '100%',
        overflow: 'hidden',
        mt: 2,
        '&:hover': {
          mt: 1,
          transition: 'ease-in-out',
          transitionDuration: '0.2s'
        }
      }}
    >
      <CardMedia sx={{ height: 200 }} image={orchid.image} title={orchid.name} />
      <CardContent>
        <Typography gutterBottom variant='h6' component='div'>
          {orchid.category?.name}
        </Typography>
        <Typography gutterBottom variant='h5' component='div'>
          {orchid.name}
        </Typography>
      </CardContent>
    </Paper>
  )
}
