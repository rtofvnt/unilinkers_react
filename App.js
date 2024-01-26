
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PropertiesPage from './PropertiesPage';
import RoomsPage from './RoomsPage';
import PropertyPage from './PropertyPage';
import RoomPage from './RoomPage';
import Header from './components/Header'
import './styles/custom.css';

const App = () => {
  return (
    <Router>
      <Header />
      <div className="container pt-4">
        <Routes>
          <Route path="/properties"           element={<PropertiesPage />} />
          <Route path="/property/:propertyId"  element={<PropertyPage />} />
          <Route path="/rooms/property/:propertyId"    element={<RoomsPage />} />
          <Route path="/room/:roomId" element={<RoomPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;