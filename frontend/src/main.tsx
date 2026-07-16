import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import "@fontsource/source-sans-pro/latin-400.css";
import "@fontsource/source-sans-pro/latin-600.css";
import "@fontsource/source-sans-pro/latin-700.css";
import "@fontsource/raleway/latin-700.css";


import { viewMode } from './hooks/getUrlParams.ts';
document.documentElement.dataset.viewMode = viewMode;


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
