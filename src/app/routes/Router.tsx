import { Routes, Route } from "react-router-dom";
import { Paginicial } from "../pages/home/Paginicial";
import { Pagpersonagens } from "../pages/characters/Pagpersonagens";
import { Pagepisodios } from "../pages/episode/Pagepisodios";
import { Pagtitans } from "../pages/titans/Pagtitans";

export const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<Paginicial />} />
            <Route path="/Characters" element={<Pagpersonagens />} />
            <Route path="/Episodes" element={<Pagepisodios />} />
            <Route path="/Titans" element={<Pagtitans />} />
        </Routes>
    );
};