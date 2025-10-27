import { useState, useEffect, type SyntheticEvent } from 'react';
import type { EpisodeApiResponse, Episode } from "../../../types/Character";

const EPISODES_API_BASE_URL = 'https://api.attackontitanapi.com/episodes';
const MAX_PAGES_TO_CHECK = 6; 

const PLACEHOLDER_IMG_URL = 'https://via.placeholder.com/400x225?text=Episode+Image+Not+Found'; 

type EpisodesState = EpisodeApiResponse | null;

const handleError = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = PLACEHOLDER_IMG_URL; 
    e.currentTarget.onerror = null; 
};

const getCleanImageUrl = (url: string): string => {

    const cleanUrl = url.replace(
        /\/revision\/latest(\/scale-to-width-down\/\d+)?(\/)?\?cb=\d+/, 
        ''
    ).replace(/\/thumbnail\//, '/'); 
    
    return cleanUrl;
};

export const Pagepisodios = () => {
    const [episodeData, setEpisodeData] = useState<EpisodesState>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchAllEpisodes = async () => {
            let allEpisodes: Episode[] = [];
            let currentPage = 1; 
            let totalCount = 0; 

            try {
                while (currentPage <= MAX_PAGES_TO_CHECK) { 
                    
                    const url = `${EPISODES_API_BASE_URL}?page=${currentPage}`;

                    const response = await fetch(url);
                    
                    if (!response.ok) {
                        console.error(`Falha ao buscar página ${currentPage}: ${response.status}`);
                        break; 
                    }
                    
                    const data: EpisodeApiResponse = await response.json();
                    
                    if (!data.results || data.results.length === 0) {
                        console.log(`Fim da lista de episódios atingido na página ${currentPage}.`);
                        break; 
                    }
                    
                    allEpisodes = allEpisodes.concat(data.results);
                    
                    if (currentPage === 1) {
                        totalCount = data.info.count;
                    }

                    if (totalCount > 0 && allEpisodes.length >= totalCount) {
                         break;
                    }

                    currentPage++; 
                } 

                const combinedData: EpisodeApiResponse = {
                    info: {
                        count: totalCount || allEpisodes.length, 
                        pages: currentPage - 1, 
                        prev: null, 
                        next: null, 
                    },
                    results: allEpisodes, 
                };

                setEpisodeData(combinedData); 

            } catch (err) {
                console.error("Erro na busca de todas as páginas de episódios:", err);
            } finally {
                setIsLoading(false); 
            }
        };

        fetchAllEpisodes();
    }, []);

    if (isLoading) {
        return (
            <div className="container my-5 text-center">
                <h2>Carregando Episódios...</h2>
                <div className="spinner-border text-primary mt-3" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    if (!episodeData || episodeData.results.length === 0) {
        return (
             <div className="container my-5 text-center alert alert-danger">
                Não foi possível carregar os episódios.
            </div>
        );
    }

    return (
        <div className="container my-5">
            <h1 className="text-start mb-4 fs-4">
                Lista de Episódios (Total: {episodeData.results.length})
            </h1>
            <p className="text-start text-muted">Lista com todos os episódios de Attack on Titan em ordem cronológica e por nome</p>
            
            <div className="row">
                {episodeData.results.map((ep: Episode) => { 
                    
                    const safeImgSrc = ep.img 
                        ? getCleanImageUrl(ep.img) 
                        : '';
                    const showImage = safeImgSrc && safeImgSrc.length > 0;

                    return (
                        <div key={ep.id} className="col-12 col-md-6 col-lg-3 mb-4">
                            <div className="card shadow-sm h-100">
                                <div className="card-body bg-secondary ">
                                    {showImage ? (
                                        <img 
                                            src={safeImgSrc} 
                                            alt={`Capa do Episódio ${ep.number}: ${ep.name}`}
                                            className="img-episode-padrao"
                                            onError={handleError} 
                                        />
                                    ) : (
                                        <div className="d-flex align-items-center justify-content-center bg-light text-muted" style={{ height: '200px', marginBottom: '15px' }}>
                                            Sem Imagem
                                        </div>
                                    )}
                                    <h5 className="card-title text-primary text-white">{ep.name}</h5>
                                    <p className="card-title text-primary text-white"> {ep.episode} </p>
                                  </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}