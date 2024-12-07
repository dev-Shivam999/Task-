
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import Provider from './context/Provider.tsx'

createRoot(document.getElementById('root')!).render(
  <Provider>

    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>

)
