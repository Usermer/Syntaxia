import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
// import Intro from './components/intro.jsx'
// eslint-disable-next-line no-unused-vars
import  WorldMap from './components/worldMap.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    {/* <Intro /> */}
    {/* <WorldMap /> */}

  </StrictMode>,
)
