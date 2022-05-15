import React from 'react'

import { Table } from 'react-bootstrap'

import { useTranslation } from 'react-i18next'

const LastVaccines = () => {
  const { t } = useTranslation()

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>{t('name')}</th>
          <th>{t('date')}</th>
          <th>{t('address')}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr>
          <td>3</td>
          <td colSpan={2}>Larry the Bird</td>
          <td>@twitter</td>
        </tr>
      </tbody>
    </Table>
  )
}

export default LastVaccines
