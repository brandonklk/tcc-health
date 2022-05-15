import React from 'react'

import { FiLogOut, FiFolder } from 'react-icons/fi'
import { FaUserEdit } from 'react-icons/fa'

import { IMenuProps, INavDropdown } from './interfaces'

const routesMenu: IMenuProps[] = [
  // {
  //   keyRoute: 1,
  //   to: '/dashboard',
  //   nameOption: 'Home',
  //   children: (
  //     <>
  //       <FiHome className="bi me-2" size={22} />
  //     </>
  //   ),
  // },
  {
    keyRoute: 2,
    to: '/documents',
    nameOption: 'Documentos',
    children: (
      <>
        <FiFolder className="bi me-2" size={22} />
      </>
    ),
  },
  // {
  //   keyRoute: 3,
  //   to: '/new-user',
  //   nameOption: 'Novo usuário',
  //   children: (
  //     <>
  //       <FiUserPlus className="bi me-2" size={22} />
  //     </>
  //   ),
  // },
]

const routesDropDrown: INavDropdown[] = [
  {
    keyRoute: 1,
    href: '/user',
    nameOption: 'edit_user',
    children: (
      <>
        <FaUserEdit className="bi me-2" size={22} />
      </>
    ),
  },
  {
    keyRoute: 2,
    href: '/',
    nameOption: 'Sair',
    children: (
      <>
        <FiLogOut className="bi me-2" size={22} />
      </>
    ),
  },
]

export { routesMenu, routesDropDrown }
