import { useState, useEffect, type SyntheticEvent } from 'react';
import type { Character, CharacterApiResponse } from '../../../types/Character'; 

const CHARACTERS_API_URL = 'https://api.attackontitanapi.com/characters';

// URL usada para o caso da imagem da API quebrar
const PLACEHOLDER_IMG_URL = 'https://via.placeholder.com/400x400?text=Character+Image+Not+Found';
type CharactersState = CharacterApiResponse | null;

// Função de manipulação de erro para substituir a imagem quebrada
const handleError = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = PLACEHOLDER_IMG_URL; 
    e.currentTarget.onerror = null; 
};

// Função para limpar URLs do Wikia, removendo os parâmetros de redimensionamento
const getCleanImageUrl = (url: string): string => {
    // Remove a parte do URL que redimensiona a imagem
    const cleanUrl = url.replace(
        /\/revision\/latest(\/scale-to-width-down\/\d+)?\?cb=\d+/, 
        ''
    );
    return cleanUrl;
};

export const Pagpersonagens = () => {
    
    const [characterData, setCharacterData] = useState<CharactersState>(null);

    useEffect(() => {
        const fetchCharacters = async () => {
            try {
                const response = await fetch(CHARACTERS_API_URL);
                const data: CharacterApiResponse = await response.json();
                setCharacterData(data); 
            } catch (err) {
                console.error("Erro ao buscar personagens:", err);
            } 
        };

        fetchCharacters();
    }, []);

    if (!characterData) {
        return (
            <div className="container my-5 text-center">
                <h2>Carregando Personagens...</h2>
                <div className="spinner-border text-primary mt-3" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="container my-5">
            <h1 className="text-center mb-4">
                Personagens (Total: {characterData?.info.count})
            </h1>
            
            <div className="row g-4">
                {characterData?.results.map((character: Character) => {
                    // Tratamento TypeScript e Limpeza do URL
                    const safeImgSrc = character.img 
                        ? getCleanImageUrl(character.img) 
                        : '';
                    const showImage = safeImgSrc && safeImgSrc.length > 0;

                    return (
                        <div key={character.id} className="col-lg-4 col-md-6">
                            <div className="card h-100 shadow-sm character-card">
                            
                                {showImage ? (
                                    <img 
                                        src={safeImgSrc} 
                                        className="card-img-top" 
                                        alt={character.name}
                                        style={{ height: '250px', objectFit: 'cover' }}
                                        onError={handleError} 
                                    />
                                ) : (
                                    <div className="d-flex align-items-center justify-content-center bg-light" style={{ height: '250px' }}>
                                        <p className="text-muted small">Sem Imagem</p>
                                    </div>
                                )}

                                <div className="card-body">
                                    <h5 className="card-title text-primary">{character.name}</h5>
                                    
                                    <p className="card-text mb-1">
                                        <span className="fw-bold">ID:</span> {character.id}
                                    </p>

                                    <p className="card-text mb-1">
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