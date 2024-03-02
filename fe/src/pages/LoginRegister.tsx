import { Container } from '@mui/material'
import React from 'react'
import NavBar from '~/components/NavBar'
import LoginCard from '~/components/login-register/LoginCard'
import RegisterCard from '~/components/login-register/RegisterCard'

export default function LoginRegisterPage() {
  const [loginCard, setLoginCard] = React.useState(true)
  const toggleCard = () => setLoginCard(!loginCard)

  return (
    <>
      <NavBar />
      <Container
        maxWidth='lg'
        sx={{
          mt: 8,
          paddingY: 6,
          height: 'calc(100vh - 64px)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          position: 'relative',
          transition: 'ease-in-out 0.5s',
          transformStyle: 'preserve-3d',
          transform: `${loginCard ? '' : 'rotateY(180deg)'}`
        }}
      >
        <LoginCard toggleCard={toggleCard} />
        <RegisterCard toggleCard={toggleCard} />
      </Container>
    </>
  )
}
