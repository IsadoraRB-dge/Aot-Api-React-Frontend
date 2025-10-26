import React from 'react';
import { Navbar } from './shared/components/header/navbar';
import { Footer } from './shared/components/footer/rfooter';
//import { Paginicial } from './pages/home/paginicial';
//import { Pagpersonagens } from './pages/characters/Pagpersonagens';
//import { Pagepisodios } from './pages/episode/Pagepisodios';
import { Pagtitans } from './pages/titans/Pagtitans';


const App: React.FC = () => {
  // ... lógica do seu App
  return (
    <>
    <Navbar/>
    <Pagtitans/>
    <Footer/>
    </>
  );
};

export default App;