import React from 'react'

import { Col, Image, Row } from 'react-bootstrap'

import { format } from 'date-fns'

import {
  InformationLastConsultHealth,
  NameLastProfissionalHealth,
} from './styles'

const LastConsultHealth = () => {
  return (
    <>
      <Row>
        <Col md={2}>
          <Image
            height={54}
            width={54}
            src="https://www.w3schools.com/howto/img_avatar.png"
            className="bi me-2"
            roundedCircle
          />
        </Col>
        <Col>
          <Row>
            <NameLastProfissionalHealth>
              Dr. Matheus de Oliveira
            </NameLastProfissionalHealth>
          </Row>
          <Row>
            <InformationLastConsultHealth className="body-custom body2">
              Especialidade: Clínico Geral
            </InformationLastConsultHealth>
          </Row>
        </Col>
      </Row>

      <Row className="my-2">
        <Col md={6}>
          <Row>
            <InformationLastConsultHealth className="subtitle1">
              Data e hora da consulta
            </InformationLastConsultHealth>
          </Row>
          <Row>
            <InformationLastConsultHealth className="subtitle2">
              {format(new Date(), 'dd/MM/yyyy HH:mm')}
            </InformationLastConsultHealth>
          </Row>
        </Col>

        <Col md={6}>
          <Row>
            <InformationLastConsultHealth className="subtitle1">
              Diaginóstico
            </InformationLastConsultHealth>
          </Row>
          <Row>
            <InformationLastConsultHealth className="subtitle2">
              Amgidalite aguda
            </InformationLastConsultHealth>
          </Row>
        </Col>
      </Row>

      <Row>
        <Col md={12}>
          <InformationLastConsultHealth className="subtitle1">
            Observação
          </InformationLastConsultHealth>
        </Col>

        <Col md={12}>
          <InformationLastConsultHealth className="subtitle2">
            Paciente se queixou de dores na garganta e febre durante dois dias
            Foi constatado presença de pus nas amígdalas Recomendado 3 dias de
            repouso
          </InformationLastConsultHealth>
        </Col>
      </Row>
    </>
  )
}

export default LastConsultHealth
