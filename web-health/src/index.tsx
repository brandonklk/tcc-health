import React, { Suspense, StrictMode } from 'react'

import { createRoot } from 'react-dom/client'
import { ToastContainer } from 'react-toastify'

import App from './App'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-toastify/dist/ReactToastify.css'

import 'App.css'

import './i18n'

const rootElement = document.getElementById('root')
const root = createRoot(rootElement as HTMLElement)

root.render(
  <Suspense fallback={<div>Loading...</div>}>
    <StrictMode>
      <App />
      <ToastContainer />
    </StrictMode>
  </Suspense>
)
