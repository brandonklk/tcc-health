import React from 'react'
import { Route, Routes } from 'react-router-dom'

import ProtectedRouters from 'components/ProtectedRouters'

import routes from 'routes/routes'

const RouterApp = () => {
  return (
    <Routes>
      {routes.map(route => {
        return route.isPrivate ? (
          <Route
            key={route.keyRoute}
            path={route.path}
            element={
              <ProtectedRouters requiredRoles={route.roles || []}>
                {route.element}
              </ProtectedRouters>
            }
          />
        ) : (
          <Route
            key={route.keyRoute}
            path={route.path}
            element={route.element}
          />
        )
      })}
    </Routes>
  )
}

export default RouterApp
