import { useState } from 'react'

import { IUsers } from 'interfaces/pages/Login'
import { getCurrentUser } from 'utils'

export const useCurrentUser = () => {
  const [currentUser] = useState<IUsers>(getCurrentUser())

  return { currentUser }
}
