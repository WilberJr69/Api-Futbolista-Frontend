import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Futbolistas from './components/Futbolistas';
import FutbolistaDetalle from './components/FutbolistaDetalle';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/futbolista" element={<Futbolistas />} />
        <Route path="/futbolista/:id" element={<FutbolistaDetalle />} />
      </Routes>
    </Router>
  );
};

export default App;