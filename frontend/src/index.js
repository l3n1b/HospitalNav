import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Homepage from './Homepage/Homepage';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        {/* <Route path="/????" element={<???? />} />
        <Route path="/????" element={<???? />} />
        <Route path="/????" element={<???? />} /> */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
