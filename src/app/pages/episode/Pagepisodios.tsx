import { useState, useEffect } from 'react';
import type { EpisodeApiResponse } from "../../../types/Character";

type EpisodesState = EpisodeApiResponse | null;
export const Pagepisodios = () => {

    const [data, setData] = useState<EpisodesState>(null);

    useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        const response = await fetch('https://api.attackontitanapi.com/episodes');
        const json: EpisodeApiResponse = await response.json(); 
        setData(json);
      } catch (error) {
        console.error("Erro ao buscar episódios:", error);
      } 
    };
        fetchEpisodes();
    }, []);

    return (
      <div className="container">
        <h1>Lista de Episódios</h1>
        <p>Guia completo de episódios da série Attack on Titan</p>
        <p>Total de Episódios: {data?.info.count}</p>
        <div className="row">
          {data?.results.map((episode) => (
            <div key={episode.id} className="col-12 col-md-6 mb-4">
              <div className="card shadow-sm">
                <div className="card-body">
                  <img src={episode.img} alt="Capa_episodio" />
                  <h5 className="card-title">{episode.name}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">{episode.number}</h6>
                  <p className="card-text">Temporada: {episode.season}</p>
                  <p className="card-text">Data de Lançamento: {episode.air_date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
}