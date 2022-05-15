import React from 'react'

import { IProtectedRouters } from 'interfaces/components/ProtectedRouters'

import SideBar from 'components/SideBar'
import { Container } from 'react-bootstrap'
import { Navigate } from 'react-router-dom'
import { useCurrentUser } from 'hooks/useCurrentUser'

const ProtectedRouters = ({ children }: IProtectedRouters) => {
  const { currentUser } = useCurrentUser()

  if (currentUser && Object.keys(currentUser).length > 0) {
    return (
      <Container fluid style={{ padding: 0 }}>
        <SideBar />

        {children}
      </Container>
    )
  }

  return <Navigate to="/" />
}

export default ProtectedRouters
