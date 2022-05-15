import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  Dispatch,
  SetStateAction,
  useMemo,
} from 'react'

import { IUsers } from 'interfaces/pages/Login'

interface AppContextData {
  userAuth: {
    currentUser: IUsers
  }
  setCurrentUser: Dispatch<SetStateAction<IUsers>>
}

interface IParamsAppContext {
  children: ReactNode
}

const AppContext = createContext<AppContextData>({} as AppContextData)

const AppProvider = ({ children }: IParamsAppContext) => {
  const [currentUser, setCurrentUser] = useState<IUsers>({} as IUsers)

  const userAuth = useMemo(
    () => ({
      currentUser,
    }),
    [currentUser]
  )

  return (
    <AppContext.Provider value={{ userAuth, setCurrentUser }}>
      {children}
    </AppContext.Provider>
  )
}

const useAppContext = () => {
  const context = useContext(AppContext)

  if (!context) {
    throw new Error('useAppContext must be used inside a AppProvider')
  }

  return context
}

export { AppProvider, useAppContext }
