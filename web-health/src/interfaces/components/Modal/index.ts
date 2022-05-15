import React from 'react'
import { ModalProps } from 'react-bootstrap'

export interface IModalHealth extends ModalProps {
  titleModal: string
  children: React.ReactNode
  formId?: string
  closeModal: () => void
}
