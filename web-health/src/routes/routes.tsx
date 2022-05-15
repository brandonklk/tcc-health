import React from 'react'

import Login from 'pages/Login'
import Dashboard from 'pages/Dashboard'
import Documents from 'pages/Documents'
import UserEdition from 'pages/UserEdition'
import NewUser from 'pages/NewUser'
import DetailsProcedure from 'pages/DetailsProcedure'

import { Role } from 'roles/roles'
import { IRoutes } from './interfaces'

const routes: IRoutes[] = [
  {
    keyRoute: 1,
    path: '/',
    isPrivate: false,
    element: <Login />,
  },
  {
    keyRoute: 2,
    path: '/dashboard',
    isPrivate: true,
    element: <Dashboard />,
  },
  {
    keyRoute: 3,
    path: '/documents',
    isPrivate: true,
    element: <Documents />,
  },
  {
    keyRoute: 4,
    path: '/user',
    isPrivate: true,
    element: <UserEdition />,
  },
  {
    keyRoute: 4,
    path: '/new-user',
    isPrivate: false,
    roles: [Role.Admin],
    element: <NewUser />,
  },
  {
    keyRoute: 5,
    path: '/details-procedure/:procedureId',
    isPrivate: true,
    element: <DetailsProcedure />,
  },
  {
    keyRoute: 6,
    path: '*',
    isPrivate: true,
    element: <h1>NOT FOUND!!!</h1>,
  },
]

export default routes
