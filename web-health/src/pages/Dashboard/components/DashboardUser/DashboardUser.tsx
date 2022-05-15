import React from 'react'

import { useNavigate } from 'react-router-dom'

import i18next from 'i18next'

import { useTranslation } from 'react-i18next'

import { Row, Col, Card } from 'react-bootstrap'

import CardComponent from 'components/Card'
import ButtonLink from 'components/Buttons/ButtonLink'

import {
  ContainerDashboards,
  CardFastAccess,
  ContainerIcon,
  ContainerTitleFastAccess,
  TitleCardFastAccess,
  ContainerTitleCardDashboard,
  TitleCardDashbord,
} from '../../styles-dashboard'

import ProfileSearches from '../ProfileSearches'
import LastConsultHealth from '../LastConsultHealth'
import LastVaccines from '../LastVaccines'
import IMCUser from '../IMCUser'

import { itemFastAccess } from '../../constants'
import { colors } from 'constants/colors'

const DashboardUser = () => {
  const { format } = i18next
  const { t } = useTranslation()
  const navigate = useNavigate()

  const redirectToAllVaccines = () => {
    // navigate('/vaccines')
  }

  const redirectToEditUser = () => {
    navigate('/user')
  }

  return (
    <ContainerDashboards className="mt-5">
      <Row>
        {itemFastAccess &&
          itemFastAccess.map(({ iconItem, titleFastAccess, keyOption }) => (
            <Col className="pt-1" key={keyOption} md={3} sm={6} xs={12}>
              <CardFastAccess bgColor={colors.blue.blueHealth}>
                <Card.Body>
                  <Card.Title>
                    <ContainerIcon>{iconItem}</ContainerIcon>
                  </Card.Title>

                  <ContainerTitleFastAccess>
                    <TitleCardFastAccess>
                      {format(t(titleFastAccess), 'uppercase')}
                    </TitleCardFastAccess>
                  </ContainerTitleFastAccess>
                </Card.Body>
              </CardFastAccess>
            </Col>
          ))}
      </Row>

      <Row>
        <Col md={7} sm={12} xs={12}>
          <CardComponent
            className="my-2"
            title={
              <ContainerTitleCardDashboard>
                <TitleCardDashbord>
                  {format(t('last_profile_searches'), 'capitalize')}
                </TitleCardDashbord>
                <ButtonLink
                  nameButton={format(t('see_more'), 'uppercase')}
                  onClick={redirectToEditUser}
                  variant="link"
                />
              </ContainerTitleCardDashboard>
            }
          >
            <ProfileSearches />
          </CardComponent>
        </Col>

        <Col md={5} sm={12} xs={12}>
          <CardComponent
            className="my-2"
            title={
              <ContainerTitleCardDashboard>
                <TitleCardDashbord>
                  {format(t('last_consult_health'), 'capitalize')}
                </TitleCardDashbord>
                <ButtonLink
                  nameButton={format(t('see_more'), 'uppercase')}
                  onClick={redirectToEditUser}
                  variant="link"
                />
              </ContainerTitleCardDashboard>
            }
          >
            <LastConsultHealth />
          </CardComponent>
        </Col>

        <Col md={7} sm={12} xs={12}>
          <CardComponent
            className="my-2"
            title={
              <ContainerTitleCardDashboard>
                <TitleCardDashbord>
                  {format(t('last_vaccines'), 'capitalize')}
                </TitleCardDashbord>
                <ButtonLink
                  nameButton={format(t('see_more'), 'uppercase')}
                  onClick={redirectToAllVaccines}
                  variant="link"
                />
              </ContainerTitleCardDashboard>
            }
          >
            <LastVaccines />
          </CardComponent>
        </Col>

        <Col md={5} sm={12} xs={12}>
          <CardComponent
            className="my-2"
            title={
              <ContainerTitleCardDashboard>
                <TitleCardDashbord>
                  {format(t('imc'), 'capitalize')}
                </TitleCardDashbord>
                <ButtonLink
                  nameButton={format(t('edit_user'), 'uppercase')}
                  onClick={redirectToEditUser}
                  variant="link"
                />
              </ContainerTitleCardDashboard>
            }
          >
            <IMCUser />
          </CardComponent>
        </Col>
      </Row>
    </ContainerDashboards>
  )
}

export default DashboardUser
