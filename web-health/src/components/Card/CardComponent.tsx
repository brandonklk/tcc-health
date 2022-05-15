import React from 'react'

import { Card as CardRB } from 'react-bootstrap'

import { CardComponentProps } from './interface'

const CardComponent = (props: CardComponentProps) => {
  const { title, children, ...rest } = props
  return (
    <CardRB {...rest}>
      <CardRB.Body>
        <CardRB.Title>{title}</CardRB.Title>
        {children}
      </CardRB.Body>
    </CardRB>
  )
}

export default CardComponent
