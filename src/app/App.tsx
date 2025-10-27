import React from 'react';
import { Navbar } from './shared/components/header/navbar';
import { Footer } from './shared/components/footer/rfooter';
import { Router } from './routes/Router';

const App: React.FC = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      
      <Navbar/>
      <Router/>
      <Footer/>
      
    </div>
  );
};

export default App;