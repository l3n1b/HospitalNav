import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Homepage from './Pages/Homepage';
import ChooseEnd from './Pages/ChooseEnd';
import MapPage from './Pages/MapPage';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import "./fonts/Mercury_Text_G1_Roman/Mercury_Text_G1_Roman.otf"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/:start" element={<ChooseEnd />} />
        <Route path="/noStart/:end" element={<MapPage />} />
        <Route path="/:start/:end" element={<MapPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
