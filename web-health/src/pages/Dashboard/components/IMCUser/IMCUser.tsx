import React from 'react'
import { Col, Row } from 'react-bootstrap'

import MaskField from 'components/MaskField'
import { FieldImc, LabelImc, ProgressImc, StatusImc } from './styles'

const IMCUser = () => {
  const calculateImcUser = () => {
    return 74.0 / (1.73 * 1.73)
  }

  return (
    <>
      <Row>
        <Col>
          <LabelImc className="body-custom body2">Seu peso (Kg)</LabelImc>
          <MaskField
            displayType="text"
            value={75}
            suffix=" Kg"
            decimalSeparator=","
            thousandSeparator="."
            renderText={(formattedValue: string) => {
              return (
                <FieldImc className="body-custom body1">
                  {formattedValue}
                </FieldImc>
              )
            }}
          />
        </Col>

        <Col>
          <LabelImc className="body-custom body2">Sua altura (M)</LabelImc>
          <MaskField
            displayType="text"
            value={175}
            format="#,## m"
            renderText={(formattedValue: string) => {
              return (
                <FieldImc className="body-custom body1">
                  {formattedValue}
                </FieldImc>
              )
            }}
          />
        </Col>
      </Row>

      <Row className="mt-3">
        <Col>
          <MaskField
            displayType="text"
            value={calculateImcUser()}
            decimalSeparator=","
            thousandSeparator="."
            decimalScale={2}
            renderText={(formattedValue: string) => {
              return (
                <StatusImc className="subtitle1">
                  Seu IMC <strong>{formattedValue}</strong>
                </StatusImc>
              )
            }}
          />
        </Col>
      </Row>

      <Row>
        <Col className="pe-0">
          <ProgressImc isProgressLeft isProgressRight={false} />
          <StatusImc className="subtitle1">Baixo</StatusImc>
        </Col>
        <Col className="px-0">
          <ProgressImc
            bgColorProcess="#125C86"
            isProgressLeft={false}
            isProgressRight={false}
          />
          <StatusImc className="subtitle1">Normal</StatusImc>
        </Col>
        <Col className="ps-0">
          <ProgressImc isProgressLeft={false} isProgressRight />
          <StatusImc className="subtitle1">Sobrepeso</StatusImc>
        </Col>
      </Row>
    </>
  )
}

export default IMCUser
