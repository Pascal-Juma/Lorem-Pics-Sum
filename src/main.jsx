import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {QueryClientProvider, QueryClient} from '@tanstack/react-query'

const appClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={appClient} >
    <App />
    </QueryClientProvider>
  </StrictMode>,
)
