import React, { ChangeEvent, useRef, useState } from 'react'
import { AiFillEdit } from 'react-icons/ai'
import { Formik } from 'formik'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { format, parseISO } from 'date-fns'
import { NumberFormatValues, SourceInfo } from 'react-number-format'

// import Select from 'components/Select'
import MaskField from 'components/MaskField'
import PreviewImage from 'components/PreviewImage'
import { FileInput, Text } from './styled'

import { IUsers, ISaveUserEdition } from 'interfaces/pages/Login'

import { validationSchemaUserEdit } from './constants'
import { editUser } from 'services/UserService'
import { useToasterFeedback } from 'hooks/useToaster'
import { buildLinkFile, setValuesUserLocalStorage } from 'utils'
import { useCurrentUser } from 'hooks/useCurrentUser'

const UserEdition = () => {
  const { t } = useTranslation()
  const { currentUser } = useCurrentUser()

  const [newAvatarUser, setNewAvatarUser] = useState<File | undefined>()

  const inputFile = useRef<HTMLInputElement>(null)

  const handleSubmitEditingUser = async (valueUser: IUsers) => {
    const newValuesUser: any = {
      name: valueUser.name,
      email: valueUser.email,
      phone: valueUser.phone,
      language: valueUser.language,
      userId: valueUser.userId,
      password: valueUser.password || null,
      avatarId: valueUser.avatarId || null,
    }

    const formData = new FormData()

    if (valueUser.avatar && newAvatarUser) {
      formData.append('avatar', valueUser.avatar as any)
    }
    Object.keys(newValuesUser).forEach(keyObject => {
      const key = keyObject as unknown as keyof ISaveUserEdition
      formData.append(keyObject, newValuesUser[key])
    })

    const {
      error,
      user: { msg, type, user },
    } = await editUser(formData)

    useToasterFeedback({ msg, type })

    if (!error) {
      if (user.avatarId) {
        user.avatar = buildLinkFile(user, 'title_storage')
      }
      setValuesUserLocalStorage(user)
    }
  }

  const handleUpload = () => {
    if (inputFile && inputFile.current) {
      inputFile.current.click()
    }
  }

  const handleImageAvatar = (
    event: ChangeEvent<HTMLInputElement>,
    setFieldValue: (
      field: string,
      value: any,
      shouldValidate?: boolean | undefined
    ) => void
  ) => {
    const [file] = (event.target.files || []) as FileList

    setNewAvatarUser(file)
    setFieldValue('avatar', file)
  }

  return (
    <Container className="py-4" fluid="md">
      <Formik
        initialValues={currentUser}
        enableReinitialize
        validationSchema={validationSchemaUserEdit}
        onSubmit={handleSubmitEditingUser}
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
            <Form noValidate onSubmit={handleSubmit}>
              <Row>
                <Col md={2}>
                  <Row>
                    <Col className="mb-2">
                      <Row className="mb-2">
                        <Col md={2}>
                          <PreviewImage
                            file={values.avatar}
                            height={115}
                            width={115}
                            className="bi me-2"
                            roundedCircle
                          />

                          <FileInput
                            ref={inputFile}
                            name="avatar"
                            onChange={(event: ChangeEvent<HTMLInputElement>) =>
                              handleImageAvatar(event, setFieldValue)
                            }
                            className="d-none"
                            type="file"
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col md={2}>
                          <Button onClick={handleUpload}>
                            <AiFillEdit size={20} />
                          </Button>
                        </Col>
                      </Row>
                    </Col>
                  </Row>

                  {values.create_date && (
                    <Row>
                      <Col>
                        <Row>
                          <Text>
                            {t('since_user', {
                              dateUser: format(
                                parseISO(values.create_date),
                                'dd/MM/yyyy'
                              ),
                            })}
                          </Text>
                        </Row>
                        <Row></Row>
                      </Col>
                    </Row>
                  )}
                </Col>
                <Col md={10}>
                  <Row>
                    <Col sm={12} md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>{t('name')}</Form.Label>
                        <Form.Control
                          name="name"
                          placeholder={t('name')}
                          value={values.name}
                          isInvalid={!!errors.name}
                          onChange={handleChange}
                          isValid={touched.name && !errors.name}
                        />
                        <Form.Control.Feedback type="invalid">
                          {t(`${errors.name}`)}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col sm={12} md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>{t('email')}</Form.Label>
                        <Form.Control
                          name="email"
                          disabled
                          placeholder={t('name')}
                          value={values.email}
                          isInvalid={!!errors.email}
                          onChange={handleChange}
                          isValid={touched.email && !errors.email}
                        />
                        <Form.Control.Feedback type="invalid">
                          {t(`${errors.email}`)}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group className="mb-3">
                        <Form.Label>{t('password')}</Form.Label>
                        <Form.Control
                          name="password"
                          type="password"
                          placeholder={t('password')}
                          value={values.password}
                          isInvalid={!!errors.password}
                          onChange={handleChange}
                          isValid={touched.password && !errors.password}
                        />
                        <Form.Control.Feedback type="invalid">
                          {t(`${errors.password}`)}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group className="mb-3">
                        <Form.Label>{t('confirmPassword')}</Form.Label>
                        <Form.Control
                          name="confirmPassword"
                          type="password"
                          placeholder={t('confirmPassword')}
                          value={values.confirmPassword}
                          isInvalid={!!errors.confirmPassword}
                          onChange={handleChange}
                          isValid={
                            touched.confirmPassword && !errors.confirmPassword
                          }
                        />
                        <Form.Control.Feedback type="invalid">
                          {t(`${errors.confirmPassword}`)}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>{t('phone')}</Form.Label>
                        <Form.Control
                          as={MaskField}
                          type="tel"
                          format="(##) #####-####"
                          name="phone"
                          placeholder={t('phone')}
                          value={values.phone || undefined}
                          isInvalid={!!errors.phone}
                          onValueChange={(
                            values: NumberFormatValues,
                            sourceInfo: SourceInfo
                          ) => {
                            if (sourceInfo && sourceInfo.event) {
                              setFieldValue(
                                sourceInfo.event.target.name,
                                values.floatValue
                              )
                            }
                          }}
                          isValid={touched.phone && !errors.phone}
                        />
                        <Form.Control.Feedback type="invalid">
                          {t(`${errors.phone}`)}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>

                    {/* <Col sm={12} md={6}>
                      <Select
                        onChangeSelect={handleChange}
                        options={optionsSelect}
                        labelInput="language"
                        nameInput="language"
                        valueSelected={values.language}
                      />
                    </Col> */}
                  </Row>
                  <Row>
                    <Col>
                      <Button type="submit" variant="primary">
                        {t('confirm')}
                      </Button>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Form>
          )
        }}
      </Formik>
    </Container>
  )
}

export default UserEdition
