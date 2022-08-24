import React from 'react';
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";

import { Repos } from '../features/repos';
import { Input } from '../features/input';

import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Input />} />
        <Route path="/repos" element={<Repos />} />
      </Routes>
    </Router>
  );
}

export default App;
