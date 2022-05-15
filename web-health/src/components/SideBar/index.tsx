import React, { memo } from 'react'
import { NavLink } from 'react-router-dom'
import i18next from 'i18next'
import { useTranslation } from 'react-i18next'

import {
  Navbar,
  Container,
  Offcanvas,
  NavDropdown,
  // DropdownButton,
  // Dropdown,
} from 'react-bootstrap'

import { GiHealthNormal } from 'react-icons/gi'

import DropDownUser from 'components/DropDownUser'

import './styles.css'
import { ContainerOptionNavBar } from './styles-components'
import { routesDropDrown, routesMenu } from 'routes/MenuRoutes'

const SideBar = () => {
  const { format } = i18next
  const { t } = useTranslation()

  return (
    <Navbar className="menu-bar" variant="light" expand={false}>
      <Container fluid>
        <Navbar.Toggle
          aria-controls="offcanvasNavbar"
          className="button-open-menu"
        />

        <Navbar.Offcanvas placement="start">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>
              <GiHealthNormal
                size={30}
                color="black"
                className="d-inline-block align-top me-2"
              />
              Saúde Pessoal
            </Offcanvas.Title>
          </Offcanvas.Header>

          <hr />
          <Offcanvas.Body className="nav nav-pills flex-column mb-auto d-flex justify-content-between">
            <ContainerOptionNavBar>
              {routesMenu.map(routeMenu => (
                <NavLink
                  key={routeMenu.keyRoute}
                  to={routeMenu.to}
                  className="nav-link link-dark d-flex align-items-center"
                >
                  {routeMenu.children}
                  {format(t(routeMenu.nameOption), 'capitalize')}
                </NavLink>
              ))}
            </ContainerOptionNavBar>

            <ContainerOptionNavBar>
              <hr />
              <NavDropdown className="dropup" title={<DropDownUser />}>
                {routesDropDrown.map(routeDropDown => (
                  <NavDropdown.Item
                    key={routeDropDown.keyRoute}
                    className="d-flex align-items-center"
                    href={routeDropDown.href}
                  >
                    {routeDropDown.children}
                    {format(t(routeDropDown.nameOption), 'capitalize')}
                  </NavDropdown.Item>
                ))}
              </NavDropdown>
            </ContainerOptionNavBar>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  )
}

export default memo(SideBar)
