import React from 'react';
import { Navbar } from './shared/components/header/navbar';
import { Footer } from './shared/components/footer/rfooter';
import { Paginicial } from './pages/home/Paginicial';
//import { Paginicial } from './pages/home/Paginicial';
//import { Pagpersonagens } from './pages/characters/Pagpersonagens';
//import { Pagepisodios } from './pages/episode/Pagepisodios';
//import { Pagtitans } from './pages/titans/Pagtitans';

const App: React.FC = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <>
      <Navbar/>
      <Paginicial/>
      <Footer/>
      </>
    </div>
  );
};

export default App;