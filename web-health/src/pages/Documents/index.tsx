import React, {
  useState,
  useEffect,
  useRef,
  ChangeEvent,
  useCallback,
} from 'react'

import { Formik, FormikProps } from 'formik'

import { useTranslation } from 'react-i18next'

import {
  Container,
  Row,
  Col,
  Form,
  DropdownButton,
  Dropdown,
  ButtonGroup,
  Button,
} from 'react-bootstrap'

import { useNavigate } from 'react-router-dom'

// import { FiFolder } from 'react-icons/fi'

import {
  IDocumentFolder,
  IFileProcedureSave,
  IMedProcedures,
} from 'interfaces/pages/Documents'

import ModalHealth from 'components/Modal'
import Select from 'components/Select'
import ListFiles from 'components/ListFiles'
import { InputFile } from 'components/FileInput/styles'
import Loading from 'components/Loading'
import ListDocuments from './components/ListDocuments'

import { getProceduresUser, saveProcedure } from 'services/ProceduresService'

import { useToasterFeedback } from 'hooks/useToaster'
import { useCurrentUser } from 'hooks/useCurrentUser'

import { typeProcedures } from './constants'
import {
  initialValuesFile,
  initialValuesFolder,
  validationSchemaFiles,
  validationSchemaFolder,
} from 'constants/constantsApp'

const Documents = () => {
  const { t } = useTranslation()
  const { currentUser } = useCurrentUser()
  const navigate = useNavigate()

  const inputFile = useRef<HTMLInputElement>(null)
  const formikRefModalFiles = useRef<FormikProps<IFileProcedureSave>>(null)

  const [isLoading, setIsLoading] = useState(false)
  const [documents, setDocuments] = useState<IMedProcedures[]>([])
  const [showModalNewFolder, setShowModalNewFolder] = useState(false)
  const [showModalNewFile, setShowModalNewFile] = useState(false)

  const allProcedures = useCallback(async (userId: number) => {
    const procedures = await getProceduresUser(userId)

    return procedures
  }, [])

  const getDocuments = async (userId: number) => {
    setIsLoading(true)
    initialValuesFile.user_id = currentUser.userId

    let allDocuments: IMedProcedures[] = []
    const {
      procedures,
      feedback: { msg, type },
      error,
    } = await allProcedures(userId)

    allDocuments = procedures

    if (!error) {
      setDocuments(allDocuments)
    }

    useToasterFeedback({ msg, type })

    setIsLoading(false)
  }

  const handleSubmitNewFolder = (valueNewFolder: IDocumentFolder) => {
    console.log('valueNewFolder ', valueNewFolder)
  }

  const handleSubmitNewFile = async (valueNewFile: IFileProcedureSave) => {
    setIsLoading(true)
    const formData = new FormData()

    const newProcedure = {
      title: valueNewFile.title,
      description: valueNewFile.description,
      type_procedures: valueNewFile.type_procedures,
      user_id: valueNewFile.user_id,
    }

    valueNewFile.files.forEach(file => {
      formData.append(`files_procedures`, file as any)
    })

    Object.keys(newProcedure).forEach(keyObject => {
      const key = keyObject as unknown as keyof IFileProcedureSave
      formData.append(keyObject, valueNewFile[key] as any)
    })

    const {
      feedback: { msg, type },
    } = await saveProcedure(formData)

    useToasterFeedback({ msg, type })

    if (type === 'success') {
      handleCloseModalNewFile()
      window.location.reload()
    }

    setIsLoading(false)
  }

  const handleCloseModalNewFolder = () => setShowModalNewFolder(false)
  // const handleShowModalNewFolder = () => setShowModalNewFolder(true)

  const handleCloseModalNewFile = () => setShowModalNewFile(false)
  const handleShowModalNewFile = () => setShowModalNewFile(true)

  const handleUpload = () => {
    if (inputFile && inputFile.current) {
      inputFile.current.click()
    }
  }

  const handleFiles = useCallback(
    (
      event: ChangeEvent<HTMLInputElement>,
      setFieldValue: (
        field: string,
        value: any,
        shouldValidate?: boolean | undefined
      ) => void
    ) => {
      let allFiles: any[] = []

      if (
        event.target.files &&
        formikRefModalFiles &&
        formikRefModalFiles.current
      ) {
        allFiles = [
          ...event.target.files,
          ...formikRefModalFiles.current.values.files,
        ]
        console.log('files ', allFiles)
        setFieldValue('files', allFiles)
      }

      return allFiles
    },
    []
  )

  const removeFiles = (indexFileRemoved: number) => {
    if (formikRefModalFiles && formikRefModalFiles.current) {
      const { files } = formikRefModalFiles.current.values

      const filesAdd = [...files].filter((_, indexFile) => {
        return indexFile !== indexFileRemoved
      })

      formikRefModalFiles.current.setFieldValue('files', filesAdd)
    }
  }

  const redirectToDetailsProcedure = (procedureId: number) => {
    navigate(`/details-procedure/${procedureId}`)
  }

  useEffect(() => {
    if (currentUser && Object.keys(currentUser).length > 0) {
      getDocuments(currentUser.userId)
    }
  }, [])

  if (isLoading) {
    return <Loading />
  }

  return (
    <Container className="my-3">
      <ModalHealth
        centered
        size="lg"
        fullscreen="lg-down"
        titleModal={t('new_file')}
        formId="createNewFile"
        show={showModalNewFile}
        closeModal={handleCloseModalNewFile}
        onHide={handleCloseModalNewFile}
      >
        <Container fluid>
          <Row className="d-flex align-items-center">
            <Col>
              <Formik
                innerRef={formikRefModalFiles}
                initialValues={initialValuesFile}
                validationSchema={validationSchemaFiles}
                onSubmit={handleSubmitNewFile}
              >
                {({
                  handleChange,
                  handleSubmit,
                  setFieldValue,
                  values,
                  touched,
                  errors,
                }) => {
                  return (
                    <Form id="createNewFile" noValidate onSubmit={handleSubmit}>
                      <Row>
                        <Col>
                          <Row>
                            <Col sm={12} md={6}>
                              <Form.Group className="mb-3">
                                <Form.Label>{t('title')}</Form.Label>
                                <Form.Control
                                  name="title"
                                  placeholder={t('title')}
                                  value={values.title}
                                  isInvalid={!!errors.title}
                                  onChange={handleChange}
                                  isValid={touched.title && !errors.title}
                                />
                                <Form.Control.Feedback type="invalid">
                                  {t(`${errors.title}`)}
                                </Form.Control.Feedback>
                              </Form.Group>
                            </Col>
                            <Col sm={12} md={6}>
                              <Select
                                onChangeSelect={handleChange}
                                options={typeProcedures}
                                nameInput="type_procedures"
                                labelInput="types_procedures"
                                valueSelected={values.type_procedures}
                              />
                            </Col>
                          </Row>
                          <Row>
                            <Col md={12}>
                              <Form.Group className="mb-3">
                                <Form.Label>{t('description')}</Form.Label>
                                <Form.Control
                                  name="description"
                                  as="textarea"
                                  rows={3}
                                  placeholder={t('description')}
                                  value={values.description}
                                  isInvalid={!!errors.description}
                                  onChange={handleChange}
                                  isValid={
                                    touched.description && !errors.description
                                  }
                                />
                                <Form.Control.Feedback type="invalid">
                                  {t(`${errors.description}`)}
                                </Form.Control.Feedback>
                              </Form.Group>
                            </Col>
                            <Col md={12}>
                              <InputFile
                                ref={inputFile}
                                name="files"
                                onChange={(
                                  event: ChangeEvent<HTMLInputElement>
                                ) => handleFiles(event, setFieldValue)}
                                className="d-none"
                                type="file"
                                multiple
                              />
                              <Button
                                variant="primary"
                                size="lg"
                                onClick={handleUpload}
                              >
                                Adicionar arquivos
                              </Button>
                            </Col>
                          </Row>
                          <Row>
                            <Col md={12}>
                              <ListFiles
                                removeFiles={removeFiles}
                                files={values.files}
                              />
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </Form>
                  )
                }}
              </Formik>
            </Col>
          </Row>
        </Container>
      </ModalHealth>

      <ModalHealth
        centered
        titleModal={t('new_folder')}
        formId="createNewFolder"
        show={showModalNewFolder}
        closeModal={handleCloseModalNewFolder}
        onHide={handleCloseModalNewFolder}
      >
        <Container fluid>
          <Row className="d-flex align-items-center">
            <Col>
              <Formik
                initialValues={initialValuesFolder}
                validationSchema={validationSchemaFolder}
                onSubmit={handleSubmitNewFolder}
              >
                {({ handleChange, handleSubmit, touched, errors, values }) => {
                  return (
                    <Form
                      id="createNewFolder"
                      noValidate
                      onSubmit={handleSubmit}
                    >
                      <Form.Group className="mb-3">
                        <Form.Label>{t('name_folder')}</Form.Label>
                        <Form.Control
                          name="nameFolder"
                          placeholder={t('name_folder')}
                          value={values.nameFolder}
                          isInvalid={!!errors.nameFolder}
                          onChange={handleChange}
                          isValid={touched.nameFolder && !errors.nameFolder}
                        />
                        <Form.Control.Feedback type="invalid">
                          {t(`${errors.nameFolder}`)}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Form>
                  )
                }}
              </Formik>
            </Col>
          </Row>
        </Container>
      </ModalHealth>

      <Row className="mt-5">
        <Col className="mb-4">
          <h4>
            <strong>{t('all_documents')}</strong>
          </h4>
        </Col>
      </Row>

      <Row>
        <div className="d-flex justify-content-end mb-3">
          <DropdownButton
            variant="primary"
            as={ButtonGroup}
            title={t('documents')}
          >
            {/* <Dropdown.Item onClick={handleShowModalNewFolder} eventKey="1">
              {t('create_new_folder')}
            </Dropdown.Item> */}
            <Dropdown.Item onClick={handleShowModalNewFile} eventKey="2">
              {t('add_new_document')}
            </Dropdown.Item>
          </DropdownButton>
        </div>
      </Row>

      {/* <Row xs={2} sm={2} md={4}>
        <Col className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title className="d-flex align-items-center">
                <FiFolder color="black" className="bi me-2" />
                <strong>Documentos</strong>
              </Card.Title>
              <Card.Text>24 documentos.</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title className="d-flex align-items-center">
                <FiFolder color="black" className="bi me-2" />
                <strong>Documentos</strong>
              </Card.Title>
              <Card.Text>24 documentos.</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title className="d-flex align-items-center">
                <FiFolder color="black" className="bi me-2" />
                <strong>Documentos</strong>
              </Card.Title>
              <Card.Text>24 documentos.</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title className="d-flex align-items-center">
                <FiFolder color="black" className="bi me-2" />
                <strong>Documentos</strong>
              </Card.Title>
              <Card.Text>24 documentos.</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title className="d-flex align-items-center">
                <FiFolder color="black" className="bi me-2" />
                <strong>Documentos</strong>
              </Card.Title>
              <Card.Text>24 documentos.</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title className="d-flex align-items-center">
                <FiFolder color="black" className="bi me-2" />
                <strong>Documentos</strong>
              </Card.Title>
              <Card.Text>24 documentos.</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title className="d-flex align-items-center">
                <FiFolder color="black" className="bi me-2" />
                <strong>Documentos</strong>
              </Card.Title>
              <Card.Text>24 documentos.</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title className="d-flex align-items-center">
                <FiFolder color="black" className="bi me-2" />
                <strong>Documentos</strong>
              </Card.Title>
              <Card.Text>24 documentos.</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row> */}

      <ListDocuments
        documents={documents}
        redirectToDetailsProcedure={redirectToDetailsProcedure}
      />
    </Container>
  )
}

export default Documents
