import { ReactNode } from 'react'
import { DropdownItemProps } from 'react-bootstrap/esm/DropdownItem'
import {
  PathRouteProps,
  LayoutRouteProps,
  NavLinkProps,
} from 'react-router-dom'
import { Role } from 'roles/roles'

type IRoutesDefault = {
  keyRoute: number
}

export interface IRoutes
  extends PathRouteProps,
    LayoutRouteProps,
    IRoutesDefault {
  keyRoute: number
  isPrivate: boolean
  roles?: Role[]
}

export interface INavDropdown extends DropdownItemProps, IRoutesDefault {
  children: ReactNode
  nameOption: string
}

export interface IMenuProps extends NavLinkProps, IRoutesDefault {
  children: ReactNode
  nameOption: string
}
