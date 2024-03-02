import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import { Link } from 'react-router-dom'
import useAuth from '~/hooks/useAuth'
import { Button } from '@mui/material'

function NavBar() {
  const { logout, idToken, user } = useAuth()

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null)

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  return (
    <AppBar
      position='fixed'
      sx={{ height: '64px', backgroundColor: '#FFFFFF', zIndex: 900, boxShadow: '0 0px 5px 0px #00000044' }}
    >
      <Container maxWidth='lg' sx={{ height: '100%' }}>
        <Toolbar disableGutters sx={{ height: '100%' }}>
          <Box component={Link} to={'/'} sx={{ display: { xs: 'none', md: 'flex' }, pr: 1 }}>
            <img src='/logo.png' height={40} width={40} />
          </Box>
          <Typography
            variant='h6'
            noWrap
            component={Link}
            to={'/'}
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontWeight: 700,
              color: '#000000 !important',
              textDecoration: 'none'
            }}
          >
            Ochidora
          </Typography>
          {/* <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
              color='inherit'
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left'
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' }
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign='center'>{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box> */}
          <Box sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}>
            <img src='/logo.png' height={40} width={40} />
          </Box>
          <Typography
            variant='h5'
            noWrap
            component={Link}
            to={'/'}
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              fontWeight: 700,
              color: '#000000 !important',
              textDecoration: 'none'
            }}
          >
            Orchidora
          </Typography>
          {/* <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, height: '100%' }}>
            {pages.map((page) => (
              <Button key={page} onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block' }}>
                {page}
              </Button>
            ))}
          </Box> */}
          <Box sx={{ flexGrow: 0, maxWidth: '100%', ml: 'auto' }}>
            {idToken ? (
              <>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography textAlign='center' sx={{ color: 'black', pr: 2 }}>
                    Hi, {user?.name}
                  </Typography>
                  <Tooltip title='Open settings'>
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar alt='A' src='https://i.pravatar.cc/' />
                    </IconButton>
                  </Tooltip>
                </Box>
                <Menu
                  sx={{ mt: '45px' }}
                  id='menu-appbar'
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {!user?.isAdmin && (
                    <MenuItem onClick={handleCloseUserMenu} component={Link} to={'/profile'}>
                      <Typography textAlign='center'>Profile</Typography>
                    </MenuItem>
                  )}
                  {user?.isAdmin && (
                    <MenuItem onClick={handleCloseUserMenu} component={Link} to={'/management'}>
                      <Typography textAlign='center'>Management</Typography>
                    </MenuItem>
                  )}
                  <MenuItem
                    onClick={() => {
                      handleCloseUserMenu()
                      logout()
                    }}
                  >
                    <Typography textAlign='center'>Logout</Typography>
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Button component={Link} to={'/login-register'} variant='contained' color='primary'>
                Login/Register
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default NavBar
