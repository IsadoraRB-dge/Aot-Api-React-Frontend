import { useState, useEffect } from 'react';
import type { TitanApiResponse, Titan } from "../../../types/Character";

const TITANS_API_URL = 'https://api.attackontitanapi.com/titans';

// URL usada para o caso da imagem da API quebrar
const PLACEHOLDER_IMG_URL = 'https://via.placeholder.com/350x200?text=Titan+Image+Not+Found'; 

export const Pagtitans = () => {
    const [titanData, setTitanData] = useState<TitanApiResponse | null>(null);

    useEffect(() => {
        const fetchTitans = async () => {
            try {
                const response = await fetch(TITANS_API_URL);
                const data: TitanApiResponse = await response.json();
                setTitanData(data);
            } catch (err) {
                console.log(err)
            } 
        };

        fetchTitans();
    }, []);

    // Função de manipulação de erro para substituir a imagem quebrada
    const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        e.currentTarget.src = PLACEHOLDER_IMG_URL; 
        e.currentTarget.onerror = null; 
    };

    // Função para limpar URLs do Wikia, removendo os parâmetros de redimensionamento
    const getCleanImageUrl = (url: string): string => {
        if (!url) return '';
        // Remove a parte do URL que redimensiona a imagem
        const cleanUrl = url.replace(
            /\/revision\/latest(\/scale-to-width-down\/\d+)?\?cb=\d+/, 
            ''
        );
        return cleanUrl;
    };


    return (
        <div className="container my-5">
            <h1 className="text-center mb-4">Titans (Total: {titanData?.info.count})</h1>
            <div className="row g-4">
                {titanData?.results.map((titan: Titan) => {
                    const safeImgSrc = titan.img ? getCleanImageUrl(titan.img) : '';

                    return (
                        <div key={titan.id} className="col-lg-4 col-md-6">
                            <div className="card h-100 shadow-sm titan-card">
                                {titan.img && (
                                    <img 
                                        src={safeImgSrc} 
                                        className="card-img-top" 
                                        alt={titan.name} 
                                        style={{ height: '500px', objectFit: 'cover' }}  
                                        onError={handleError} 
                                    />
                                )}
                                <div className="card-body">
                                    <h5 className="card-title text-primary">{titan.name}</h5>

                                    <p className="card-text">
                                        <span className="fw-bold">Altura:</span> {titan.height}
                                    </p>

                                    <p className="card-text">
                                        <span className="fw-bold">Portador Atual:</span> {titan.current_inheritor || 'N/A'}
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