import { Box, Button, Container, TextField, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Loading from '~/components/Loading'
import CommentCard from '~/components/orchid-detail/CommentCard'
import useComment from '~/hooks/apis/useComment'
import useOrchid from '~/hooks/apis/useOrchid'
import useAuth from '~/hooks/useAuth'
import { IComment, IOrchidDetail } from '~/interfaces'
import { notifyError } from '~/utils/toastify'

export default function OrchidDetailsPage() {
  const { user } = useAuth()
  const location = useLocation()
  const { getOrchidDetail } = useOrchid()
  const { postComment } = useComment()
  const [loading, setLoading] = useState(true)
  const [comment, setComment] = useState('')
  const slug = location.pathname.slice(8)
  const [orchid, setOrchid] = useState<IOrchidDetail>({
    _id: '',
    category: {
      _id: '',
      name: ''
    },
    comments: [
      {
        _id: '',
        author: {
          _id: '',
          name: ''
        },
        comment: '',
        createdAt: '',
        updatedAt: ''
      }
    ],
    image: '',
    isNatural: false,
    name: '',
    origin: '',
    slug: ''
  })
  const [disableComment, setDisableComment] = useState(false)

  const getData = async () => {
    try {
      const data = await getOrchidDetail(slug)
      setOrchid(data)
    } catch (error) {
      notifyError('Error')
    } finally {
      setLoading(false)
    }
  }

  const postData = async (orchidId: string, comment: string) => {
    try {
      await postComment(orchidId, comment)
      getData()
      setComment('')
    } catch (error) {
      notifyError('You cannot post comment')
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    getData()
    orchid.comments.forEach((value: IComment) => {
      if (value.author._id === user?.id) {
        setDisableComment(true)
      }
    })
    return () => {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return loading ? (
    <Loading />
  ) : (
    <Container maxWidth='lg' sx={{ minHeight: 'calc(100vh - 64px)' }}>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap'
        }}
      >
        <Box
          sx={{
            width: {
              xs: '100%',
              md: '35%'
            },
            py: 5,
            pr: 2
          }}
        >
          <img src={orchid.image} style={{ width: '100%', objectFit: 'cover', aspectRatio: 5 / 6, borderRadius: 10 }} />
        </Box>
        <Box
          sx={{
            width: {
              xs: '100%',
              md: '65%'
            },
            py: 5,
            pl: 2
          }}
        >
          <Typography
            sx={{
              mb: 4
            }}
            variant='h4'
            fontWeight={700}
          >
            {orchid.name}
          </Typography>
          <Typography
            sx={{
              my: 2
            }}
            variant='body1'
          >
            Origin: {orchid.origin}
          </Typography>
          <Typography
            sx={{
              my: 2
            }}
            variant='body1'
          >
            Category: {orchid.category.name}
          </Typography>
          <Typography
            sx={{
              my: 2
            }}
            variant='body1'
          >
            {orchid.isNatural ? 'Hoa tự nhiên' : ''}
          </Typography>
        </Box>
      </Box>
      <Box>
        <Typography variant='h5' sx={{ mb: 1 }}>
          Comments
        </Typography>
        {orchid.comments.map((value: IComment) => (
          <CommentCard key={value._id} name={value.author.name} updatedAt={value.updatedAt} comment={value.comment} />
        ))}
        <TextField
          value={comment}
          disabled={disableComment}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setComment(event.target.value)
          }}
          fullWidth
          label='Your comment'
          multiline
          rows={4}
        />
        <Button
          disabled={disableComment}
          size='large'
          variant='outlined'
          sx={{ my: 2 }}
          onClick={() => postData(orchid._id, comment)}
        >
          Post
        </Button>
      </Box>
    </Container>
  )
}
