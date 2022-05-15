import React from 'react'

import { Modal, Button } from 'react-bootstrap'

import { useTranslation } from 'react-i18next'
import { IModalHealth } from '../../interfaces/components/Modal'

const ModalHealth = (props: IModalHealth) => {
  const { t } = useTranslation()
  const { children, titleModal, closeModal, formId, ...rest } = props

  return (
    <Modal {...rest}>
      <Modal.Header closeButton>
        <Modal.Title>{titleModal}</Modal.Title>
      </Modal.Header>

      <Modal.Body>{children}</Modal.Body>

      <Modal.Footer>
        <Button variant="danger" onClick={closeModal}>
          {t('button_close')}
        </Button>
        <Button variant="success" type="submit" form={formId}>
          {t('button_success')}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ModalHealth
