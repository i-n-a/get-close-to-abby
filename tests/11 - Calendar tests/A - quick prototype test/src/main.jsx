import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Link, BrowserRouter, Routes, Route } from "react-router";
import PosterCalendar from './pages/PosterCalendar';
import FilterListCalendar from './pages/FilterListCalendar';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App/>}/>
        <Route path="/poster" element={<PosterCalendar />} />
        <Route path="/list" element={<FilterListCalendar />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
