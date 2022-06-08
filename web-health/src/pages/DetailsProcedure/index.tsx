import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  Col,
  Container,
  Row,
  Badge,
  Button,
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap'
import { FiSearch } from 'react-icons/fi'

import Loading from 'components/Loading'
import CardComponent from 'components/Card'
import PreviewImage from 'components/PreviewImage'

import { useToasterFeedback } from 'hooks/useToaster'
import { getDetailsProcedure } from 'services/ProceduresService'
import { ETypeProcedures, IDetailsProcedures } from 'interfaces/pages/Documents'
import { buildLinkFile } from 'utils'

const DetailsProcedure = () => {
  const { procedureId: procedure_id } = useParams()

  const { t } = useTranslation()

  const [isLoading, setIsLoading] = useState(false)
  const [procedureId] = useState(Number(procedure_id))
  const [procedureDetails, setProcedureDetails] = useState<IDetailsProcedures>(
    {} as IDetailsProcedures
  )

  const getDetailProcedure = async () => {
    setIsLoading(true)

    let detailProcedure: IDetailsProcedures = {} as IDetailsProcedures

    const {
      detailsProcedure,
      feedback: { msg, type },
      error,
    } = await getDetailsProcedure(procedureId)

    detailProcedure = detailsProcedure

    if (!error) {
      setProcedureDetails(detailProcedure)
    }

    useToasterFeedback({ msg, type })

    setIsLoading(false)
  }

  useEffect(() => {
    getDetailProcedure()
  }, [])

  const builtTypeProcedure = () => {
    switch (procedureDetails.type_procedures) {
      case ETypeProcedures.CONTINUOUS_REMEDY:
        return 'continuous_remedy'
      case ETypeProcedures.EXAMS:
        return 'exams'
      case ETypeProcedures.PRESCRIPTION:
        return 'prescription'
      case ETypeProcedures.SURGERY:
        return 'surgery'
      case ETypeProcedures.VACCINES:
        return 'vaccines'
      case ETypeProcedures.PHYSIOTHERAPY:
          return 'physiotherapy'
      case ETypeProcedures.PSYCHOLOGY:
          return 'psychology'
      default:
        return 'type_undefined'
    }
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <Container fluid="sm" className="py-5">
      <Row className="mb-5">
        <Col>
          <h3>
            {t('title_details_procedure', {
                procedureId: procedureId
            })}
          </h3>
        </Col>
      </Row>
      <Row>
        <Col>
          <CardComponent
            title={
              <div className="d-flex justify-content-between align-items-center">
                <div className="w-75">
                  <OverlayTrigger
                    placement="top"
                    delay={{ show: 250, hide: 400 }}
                    overlay={
                      <Tooltip>{procedureDetails.title_procedure}</Tooltip>
                    }
                  >
                    <h4 className="text-truncate">
                      {procedureDetails.title_procedure}
                    </h4>
                  </OverlayTrigger>
                </div>
                <div>
                  <Badge pill bg="primary">
                    {t(builtTypeProcedure())}
                  </Badge>
                </div>
              </div>
            }
          >
            <>
              <Row>
                <Col>
                  <span>{procedureDetails.description}</span>
                </Col>
              </Row>
              <Row>
                {procedureDetails &&
                procedureDetails.files &&
                procedureDetails.files.length > 0 ? (
                  <>
                    {procedureDetails.files.map(file => (
                      <Col className="my-3" md={12} key={file.files_id}>
                        <Row className="align-items-center">
                          <Col md={1} sm={1}>
                            <PreviewImage
                              height={60}
                              width={60}
                              className="bi"
                              roundedCircle
                              file={buildLinkFile(file, 'title_storage')}
                            />
                          </Col>
                          <Col md={10} sm={10}>
                            <h6 className="mb-0 text-truncate">
                              {file.file_title}
                            </h6>
                          </Col>
                          <Col md={1} sm={1}>
                            <Button
                              href={buildLinkFile(file, 'title_storage')}
                              target="_blank"
                              variant="light"
                              rel="noopener noreferrer"
                            >
                              <FiSearch size={22} color="black" />
                            </Button>
                          </Col>
                        </Row>
                      </Col>
                    ))}
                  </>
                ) : (
                  <Col>
                    <h6 className="mb-0 mt-3">
                      {t('files_not_found_procedure')}
                    </h6>
                  </Col>
                )}
              </Row>
            </>
          </CardComponent>
        </Col>
      </Row>
    </Container>
  )
}

export default DetailsProcedure
