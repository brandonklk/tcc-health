import React, { useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom'
import { Formik } from 'formik'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { GiHealthNormal } from 'react-icons/gi'
import { FiUserPlus } from 'react-icons/fi'

import { authUser } from 'services/AuthService'

import { useToasterFeedback } from 'hooks/useToaster'

import { ILogin } from 'interfaces/pages/Login'

import { colors } from 'constants/colors'

import {
  validationSchemaLogin,
  initialValuesLogin,
} from 'constants/constantsApp'
import { ContainerButtonLogin, ContainerImage, TitleLogin } from './styles'
import {
  buildLinkFile,
  setTokenAuthorized,
  setValuesUserLocalStorage,
} from 'utils'

const Login = () => {
  const [isCompleted, setIsCompleted] = useState(false)
  const { t } = useTranslation()
  const navigate = useNavigate()

  useEffect(() => {
    if (isCompleted) {
      navigate('/documents')
    }
  }, [isCompleted])

  const handleSubmitLogin = async (valueLogin: ILogin) => {
    const {
      auth: { msg, type, user },
      error,
    } = await authUser(valueLogin)

    if (!error) {
      if (user.avatarId) {
        user.avatar = buildLinkFile(user, 'title_storage')
      }
      const { token, ...rest } = user
      setTokenAuthorized(token || '')
      setValuesUserLocalStorage(rest)
      setIsCompleted(true)
    }

    useToasterFeedback({ msg, type })
  }

  const redirectToCreateNewUser = () => {
    navigate('/new-user')
  }

  return (
    <Container fluid>
      <Row className="vh-100 pr-0">
        <Col
          md={6}
          className="d-flex align-items-center justify-content-center"
        >
          <Row className="w-100">
            <Col md={12} className="mb-3">
              <TitleLogin>Saúde Pessoal</TitleLogin>
            </Col>
            <Col md={12} className="mb-3">
              <Formik
                initialValues={initialValuesLogin}
                validationSchema={validationSchemaLogin}
                onSubmit={handleSubmitLogin}
              >
                {({ handleChange, values, handleSubmit, touched, errors }) => {
                  return (
                    <Form noValidate onSubmit={handleSubmit} className="w-100">
                      <Form.Group className="mb-3">
                        <Form.Label>{t('email')}</Form.Label>
                        <Form.Control
                          name="email"
                          value={values.email}
                          isInvalid={!!errors.email}
                          onChange={handleChange}
                          className="rounded"
                          isValid={touched.email && !errors.email}
                        />
                        <Form.Control.Feedback type="invalid">
                          {t(`${errors.email}`)}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>{t('password')}</Form.Label>
                        <Form.Control
                          name="password"
                          type="password"
                          value={values.password}
                          onChange={handleChange}
                          isInvalid={!!errors.password}
                          isValid={touched.password && !errors.password}
                        />
                        <Form.Control.Feedback type="invalid">
                          {t(`${errors.password}`)}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <ContainerButtonLogin className="d-flex justify-content-center">
                        <Button
                          size="lg"
                          type="submit"
                          className="w-50 rounded-4"
                          variant="primary"
                        >
                          {t('enter')}
                        </Button>
                      </ContainerButtonLogin>
                    </Form>
                  )
                }}
              </Formik>
            </Col>
            <Col md={12}>
              <ContainerButtonLogin className="mb-3 d-flex justify-content-center">
                <Button
                  onClick={() => redirectToCreateNewUser()}
                  variant="link"
                >
                  <FiUserPlus className="bi me-2" size={22} />{' '}
                  {t('create_new_user')}
                </Button>
              </ContainerButtonLogin>
            </Col>
          </Row>
        </Col>

        <Col md={6} className="px-0">
          <ContainerImage className="d-flex align-items-center justify-content-center">
            <GiHealthNormal size={126} color={colors.white} />
          </ContainerImage>
        </Col>
      </Row>
    </Container>
  )
}

export default Login
