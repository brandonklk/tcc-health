import React from 'react'

import { Image } from 'react-bootstrap'

import avatarDefault from '../../asserts/avatar.png'
import { useCurrentUser } from 'hooks/useCurrentUser'

const DropDownUser = () => {
  const {
    currentUser: { avatar, name },
  } = useCurrentUser()

  return (
    <>
      <Image
        height={46}
        width={46}
        src={avatar || avatarDefault}
        className="bi me-2"
        roundedCircle
      />

      <span className="bi me-2">{name}</span>
    </>
  )
}

export default DropDownUser
