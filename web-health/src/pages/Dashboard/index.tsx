import React from 'react'

// import { Container } from 'react-bootstrap'

// import { useTranslation } from 'react-i18next'

import DashboardUser from './components/DashboardUser'
import { ContainerDashboard, NameUser } from './styles-dashboard'

const Dashboard = () => {
  // const { i18n } = useTranslation()

  // const teste = (e: ChangeEvent<HTMLSelectElement>) => {
  //   i18n.changeLanguage(e.target.value)
  // }

  return (
    <ContainerDashboard className="my-4 p-4" fluid="md">
      <NameUser>Olá, José da Silva Pinheiro</NameUser>
      <DashboardUser />
    </ContainerDashboard>
  )
}

export default Dashboard
