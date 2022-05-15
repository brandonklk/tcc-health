import React from 'react'
import { Card, Col, Row, Button } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

import { IPropsListDocuments } from 'interfaces/pages/Documents'

const ListDocuments = (props: IPropsListDocuments) => {
  const { documents, redirectToDetailsProcedure } = props

  const { t } = useTranslation()

  return (
    <Row>
      <Col>
        {documents && documents.length > 0 ? (
          <div style={{ height: '420px', overflow: 'auto' }}>
            {documents.map((i, index) => (
              <Row className="me-0" key={index}>
                <Col className="mb-4">
                  <Card>
                    <Card.Body>
                      <Card.Title>
                        <h6 className="mb-0 text-truncate w-95">#{i.procedures_id} - {i.title}</h6>
                      </Card.Title>
                      <Button
                        variant="primary"
                        onClick={() =>
                          redirectToDetailsProcedure(i.procedures_id || 0)
                        }
                      >
                        {t('view_details')}
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            ))}
          </div>
        ) : (
          <Card>
            <Card.Body>
              <h6 className="mb-0">Nenhum documento cadastrado</h6>
            </Card.Body>
          </Card>
        )}
      </Col>
    </Row>
  )
}

export default ListDocuments
