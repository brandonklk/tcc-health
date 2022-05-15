import { ReactNode } from 'react'
import { CardProps } from 'react-bootstrap'

export interface CardComponentProps extends Omit<CardProps, 'title'> {
  title: ReactNode
  children: ReactNode
}
