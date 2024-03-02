import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'
import Footer from '~/components/Footer'
import NavBar from '~/components/NavBar'

const Layout = () => {
  return (
    <>
      <NavBar />
      <Box marginTop={'64px'}>
        <Outlet />
      </Box>
      <Footer />
    </>
  )
}

export default Layout
