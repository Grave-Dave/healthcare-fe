import {StrictMode} from 'react'
import {BrowserRouter as Router} from "react-router-dom";
import {createRoot} from 'react-dom/client'
import './public/styles/styles.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Router>
            <App/>
        </Router>
    </StrictMode>,
)
