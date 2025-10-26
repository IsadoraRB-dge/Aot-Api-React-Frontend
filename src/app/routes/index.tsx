import { Routes, Route } from "react-router-dom";

// ⚠️ Importe suas páginas (Você precisará criar esta pasta/arquivo)
import Home from './Home.tsx'; 

const AppRoutes = () => {
    return(
        // Use <Routes> no lugar do <Switch>
        <Routes> 
             {/* 2. Defina as rotas com o componente <Route> */}
             <Route path="/" element={<Home />} />
             
             {/* Adicione outras rotas aqui:
             <Route path="/contato" element={<Contato />} /> 
             */}
        </Routes>
    )
}

// Lembre-se de exportar por padrão para facilitar a importação no App.tsx
export default AppRoutes;