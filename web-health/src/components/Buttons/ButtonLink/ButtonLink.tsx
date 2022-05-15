import React from 'react'

import { ButtonLinkHealth } from './styles'

import { Buttons } from '../interfaces'

const ButtonLink = (props: Buttons) => {
  const { nameButton, ...rest } = props

  return (
    <ButtonLinkHealth variant="link" {...rest}>
      {nameButton}
    </ButtonLinkHealth>
  )
}

export default ButtonLink
