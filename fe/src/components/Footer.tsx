import { Box, Container, Grid, Typography, Link } from '@mui/material'

const Footer = () => {
  return (
    <Box
      sx={{
        color: 'black',
        borderTop: '1px solid #e0e0e0'
      }}
    >
      <Container maxWidth='lg' sx={{ py: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <Typography variant='h6'>Orchidora</Typography>
            <Typography>
              <Link
                href='#'
                sx={{ color: 'white', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
              >
                About Us
              </Link>
            </Typography>
            <Typography>
              <Link
                href='#'
                sx={{ color: 'white', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
              >
                Contact
              </Link>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant='h6'>Services</Typography>
            <Typography>
              <Link
                href='#'
                sx={{ color: 'white', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
              >
                Service 1
              </Link>
            </Typography>
            <Typography>
              <Link
                href='#'
                sx={{ color: 'white', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
              >
                Service 2
              </Link>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant='h6'>Legal</Typography>
            <Typography>
              <Link
                href='#'
                sx={{ color: 'white', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
              >
                Privacy Policy
              </Link>
            </Typography>
            <Typography>
              <Link
                href='#'
                sx={{ color: 'white', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
              >
                Terms of Service
              </Link>
            </Typography>
          </Grid>
        </Grid>
        <Typography variant='body2' align='center' sx={{ mt: 4 }}>
          © {new Date().getFullYear()} All rights reserved.
        </Typography>
      </Container>
    </Box>
  )
}

export default Footer
