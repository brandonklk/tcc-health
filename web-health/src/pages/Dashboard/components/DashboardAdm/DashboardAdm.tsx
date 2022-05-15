import React from 'react'
import { Col, Row } from 'react-bootstrap'

const DashboardAdm = () => {
  return (
    <Row>
      <Col
        className="p-3"
        md={2}
        sm={6}
        xs={12}
        style={{ backgroundColor: 'blue' }}
      >
        DashboardAdm1
      </Col>
      <Col md={2} sm={6} xs={12} style={{ backgroundColor: 'red' }}>
        DashboardAdm1
      </Col>
      <Col md={2} sm={6} xs={12} style={{ backgroundColor: 'pink' }}>
        DashboardAdm1
      </Col>
      <Col md={2} sm={6} xs={12} style={{ backgroundColor: 'yellow' }}>
        DashboardAdm1
      </Col>
      <Col md={2} sm={6} xs={12} style={{ backgroundColor: 'black' }}>
        DashboardAdm1
      </Col>
      <Col md={2} sm={6} xs={12} style={{ backgroundColor: 'purple' }}>
        DashboardAdm1
      </Col>
    </Row>
  )
}

export default DashboardAdm
