import { useState, useEffect, type SyntheticEvent } from 'react';
import type { EpisodeApiResponse, Episode } from "../../../types/Character";

type EpisodesState = EpisodeApiResponse | null;
const EPISODES_API_URL = 'https://api.attackontitanapi.com/episodes';

// URL usada para o caso da imagem da API quebrar
const PLACEHOLDER_IMG_URL = 'https://via.placeholder.com/400x225?text=Episode+Image+Not+Found'; 

export const Pagepisodios = () => {
    const [data, setData] = useState<EpisodesState>(null);

    useEffect(() => {
        const fetchEpisodes = async () => {
            try {
                const response = await fetch(EPISODES_API_URL);
                const json: EpisodeApiResponse = await response.json(); 
                setData(json);
            } catch (error) {
                console.error("Erro ao buscar episódios:", error);
            } 
        };
        fetchEpisodes();
    }, []);
    
    // 1. Função de manipulação de erro para substituir a imagem quebrada
    const handleError = (e: SyntheticEvent<HTMLImageElement, Event>) => {
        e.currentTarget.src = PLACEHOLDER_IMG_URL; 
        e.currentTarget.onerror = null; 
    };

    // 2. Função para limpar URLs do Wikia, removendo os parâmetros de redimensionamento
    const getCleanImageUrl = (url: string): string => {
        // Remove a parte do URL que redimensiona a imagem
        const cleanUrl = url.replace(
            /\/revision\/latest(\/scale-to-width-down\/\d+)?\?cb=\d+/, 
            ''
        );
        return cleanUrl;
    };

    return (
        <div className="container">
            <h1>Lista de Episódios</h1>
            <p>Guia completo de episódios da série Attack on Titan</p>
            <p>Total de Episódios: {data?.info.count}</p>
            <div className="row">
                {data?.results.map((episode: Episode) => { 
                    
                    const safeImgSrc = episode.img 
                        ? getCleanImageUrl(episode.img) 
                        : '';
                    const showImage = safeImgSrc && safeImgSrc.length > 0;

                    return (
                        <div key={episode.id} className="col-12 col-md-6 mb-4">
                            <div className="card shadow-sm">
                                <div className="card-body">
                                    {showImage && (
                                        <img 
                                            src={safeImgSrc} 
                                            alt={`Capa do Episódio ${episode.number}: ${episode.name}`} 
                                            style={{ width: '100%', height: 'auto', objectFit: 'cover', marginBottom: '10px' }}
                                            onError={handleError} 
                                        />
                                    )}
                                    
                                    {!showImage && <div style={{ height: '200px', backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }}>No Image Available</div>}

                                    <h5 className="card-title">{episode.name}</h5>
                                    <h6 className="card-subtitle mb-2 text-muted">{episode.number}</h6>
                                    <p className="card-text">Temporada: {episode.season}</p>
                                    <p className="card-text">Data de Lançamento: {episode.air_date}</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}