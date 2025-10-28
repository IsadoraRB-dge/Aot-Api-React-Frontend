import { useState, useEffect, type SyntheticEvent } from 'react';
import type { Character, CharacterApiResponse } from '../../../types/Character'; 
import { BaseUrl } from '../../shared/constants/variaveis';

const MAX_PAGES_TO_CHECK = 15; 

const PLACEHOLDER_IMG_URL = 'https://via.placeholder.com/400x400?text=Image+Not+Found';

type CharactersState = CharacterApiResponse | null;

const handleError = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = PLACEHOLDER_IMG_URL; 
    e.currentTarget.onerror = null; 
};

const getCleanImageUrl = (url: string): string => {
    if (!url) return '';
    

    const cleanUrl = url.replace(
        /\/revision\/latest(\/scale-to-width-down\/\d+)?(\/)?\?cb=\d+/, 
        ''
    );
    const finalUrl = cleanUrl.replace(/\/thumbnail\//, '/'); 
    
    return finalUrl.endsWith('/') && finalUrl.length > 1 ? finalUrl.slice(0, -1) : finalUrl;
};


export const Pagpersonagens = () => {
    
    const [characterData, setCharacterData] = useState<CharactersState>(null);
    const [isLoading, setIsLoading] = useState(true); 

    useEffect(() => {
        const fetchAllCharacters = async () => {
            let allCharacters: Character[] = [];
            let currentPage = 1; 
            let totalCharactersReported = 0; 

            try {
                while (currentPage <= MAX_PAGES_TO_CHECK) { 
                    const url = `${BaseUrl}/characters?page=${currentPage}`;

                    const response = await fetch(url);
                    
                    if (!response.ok) {
                        console.error(`Falha ao buscar página ${currentPage}: ${response.status}`);
                        break; 
                    }
                    
                    const data: CharacterApiResponse = await response.json();
                    
                    if (!data.results || data.results.length === 0) {
                        console.log(`Fim da lista atingido na página ${currentPage}.`);
                        break; 
                    }
                    
                    allCharacters = allCharacters.concat(data.results);
                    
                    if (currentPage === 1) {
                        totalCharactersReported = data.info.count;
                    }

                    if (totalCharactersReported > 0 && allCharacters.length >= totalCharactersReported) {
                         break;
                    }

                    currentPage++; 
                } 

                const combinedData: CharacterApiResponse = {
                    info: {
                        count: totalCharactersReported || allCharacters.length, 
                        pages: currentPage - 1, 
                        prev: null, 
                        next: null, 
                    },
                    results: allCharacters, 
                };

                setCharacterData(combinedData); 

            } catch (err) {
                console.error("Erro na busca de páginas:", err);
            } finally {
                setIsLoading(false); 
            }
        };

        fetchAllCharacters();
    }, []);

    if (isLoading) {
        return (
            <div className="container my-5 text-center">
                <h4>Carregando Todos os Personagens...</h4>
                <div className="spinner-border text-primary mt-3" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    if (!characterData || characterData.results.length === 0) {
        return (
             <div className="container my-5 text-center alert alert-danger">
                Não foi possível carregar os personagens. Tente novamente mais tarde.
            </div>
        );
    }

    return (
        <div className="container my-5">
            <h1 className="text-start mb-4 fs-4">
                Todos os Personagens (Total: {characterData?.results.length})
            </h1>
            
            <div className="row g-4">
                {characterData?.results.map((character: Character) => {
                    const safeImgSrc = character.img 
                        ? getCleanImageUrl(character.img) 
                        : '';
                    const showImage = safeImgSrc && safeImgSrc.length > 0;

                    return (
                        <div key={character.id} className="col-lg-3 col-md-6">
                            <div className="card h-100 shadow-sm character-card">
                            
                                {showImage ? (
                                    <img 
                                        src={safeImgSrc} 
                                        className="card-img-top img-card-padrao" 
                                        alt={character.name}
                                        onError={handleError} 
                                    />
                                ) : (
                                    <div className="d-flex align-items-center justify-content-center bg-light" style={{ height: '200px' }}>
                                        <p className="text-muted small">Sem Imagem</p>
                                    </div>
                                )}

                                <div className="card-body bg-secondary">
                                    <h5 className="card-title text-primary text-white">{character.name}</h5>
                                    
                                    <p className="card-text mb-1 text-white">
                                        <span className="fw-bold">ID:</span> {character.id}
                                    </p>

                                    <p className="card-text mb-1 text-white">
                                        <span className="fw-bold">Gênero:</span> {character.gender || 'N/A'}
                                    </p>
                                    
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

