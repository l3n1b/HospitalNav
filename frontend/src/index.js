import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Homepage from './Pages/Homepage';
import ChooseEnd from './Pages/ChooseEnd';
import Map2D from './Pages/Map2D';
import DestSelector from './Pages/DestSelector';
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
        <Route path="/chooseDest" element={<DestSelector />} />
        <Route path="/:start" element={<ChooseEnd />} />
        <Route path="/noStart/:end" element={<Map2D />} />
        <Route path="/:start/:end" element={<Map2D />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
