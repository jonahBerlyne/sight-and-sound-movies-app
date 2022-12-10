import React from 'react';
import Landing from './Pages/Landing';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import Footer from './Components/Footer';

export default function App() {
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<Landing />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}