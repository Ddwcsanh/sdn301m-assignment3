import { Avatar, Box, CardContent, Paper, Typography } from '@mui/material'
import moment from 'moment'
export interface ICommentCard {
  name: string
  comment: string
  updatedAt: string
}

const CommentCard = ({ name, comment, updatedAt }: ICommentCard) => {
  return (
    <Paper
      sx={{
        my: 3
      }}
      elevation={3}
    >
      <CardContent
        sx={{
          display: 'flex'
        }}
      >
        <Avatar src='https://i.pravatar.cc/' sx={{ width: 56, height: 56 }} />
        <Box
          sx={{
            display: 'flex',
            gap: 1.5,
            mt: 1.5,
            ml: 1,
            flexDirection: 'column',
            alignItems: 'start'
          }}
        >
          <Typography variant='h6' fontWeight={700}>
            {name}
          </Typography>
          <Typography variant='h6' fontSize={17}>
            {comment}
          </Typography>
          <Typography variant='body2' color='grey'>
            Posted at {moment(updatedAt).format('DD-MM-yyyy HH:mm')}
          </Typography>
        </Box>
      </CardContent>
    </Paper>
  )
}

export default CommentCard
