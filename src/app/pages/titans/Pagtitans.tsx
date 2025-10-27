import { useState, useEffect, type SyntheticEvent } from 'react';
import type { TitanApiResponse, Titan } from "../../../types/Character";
import { BaseUrl } from '../../shared/constants/variaveis';


const MAX_PAGES_TO_CHECK = 3; 

const PLACEHOLDER_IMG_URL = 'https://via.placeholder.com/350x200?text=Titan+Image+Not+Found'; 

type TitansState = TitanApiResponse | null;

interface InheritorCharacter {
    id: number;
    name: string;
}

type EnhancedTitan = Titan & {
    inheritorName: string; 
};

const handleError = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = PLACEHOLDER_IMG_URL; 
    e.currentTarget.onerror = null; 
};

const getCleanImageUrl = (url: string): string => {
    if (!url) return '';
    
    const cleanUrl = url.replace(
        /\/revision\/latest(\/scale-to-width-down\/\d+)?(\/)?\?cb=\d+/, 
        ''
    ).replace(/\/thumbnail\//, '/'); 
    
    return cleanUrl;
};

export const Pagtitans = () => {
    const [titanData, setTitanData] = useState<TitansState>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchAllTitans = async () => {
            let allTitans: Titan[] = [];
            let currentPage = 1; 
            let totalCount = 0; 
            
            try {
                while (currentPage <= MAX_PAGES_TO_CHECK) { 
                    const url = `${BaseUrl}/titans?page=${currentPage}`;

                    const response = await fetch(url);
                    if (!response.ok) break;
                    
                    const data: TitanApiResponse = await response.json();
                    
                    if (!data.results || data.results.length === 0) break;
                    
                    allTitans = allTitans.concat(data.results);
                    
                    if (currentPage === 1) {
                        totalCount = data.info.count;
                    }

                    if (totalCount > 0 && allTitans.length >= totalCount) break;

                    currentPage++; 
                }
            } catch (err) {
                console.error("Erro na busca de Titãs:", err);
            }
            
            const enhancedTitansPromises = allTitans.map(async (titan) => {
                let inheritorName = titan.current_inheritor || 'N/A';
                
                if (titan.current_inheritor && titan.current_inheritor.startsWith('http')) {
                    try {
                        const inheritorResponse = await fetch(titan.current_inheritor);
                        const inheritorData: InheritorCharacter = await inheritorResponse.json(); 
                        
                        inheritorName = inheritorData.name;
                        
                    } catch (e) {
                        console.error(`Falha ao buscar nome do portador para ${titan.name}:`, e);
                        inheritorName = 'Erro ao carregar';
                    }
                }

                return { ...titan, inheritorName };
            });

            const enhancedTitans: EnhancedTitan[] = await Promise.all(enhancedTitansPromises);
            
            const combinedData = {
                info: { count: totalCount || enhancedTitans.length, pages: currentPage - 1, next: null, prev: null },
                results: enhancedTitans,
            };

            setTitanData(combinedData);
            setIsLoading(false);
        };

        fetchAllTitans();
    }, []);


    if (isLoading) {
        return (
            <div className="container my-5 text-center">
                <h2>Carregando Titãs...</h2>
                <div className="spinner-border text-primary mt-3" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }
    
    if (!titanData || titanData.results.length === 0) {
        return <div className="container my-5 text-center">Nenhum Titã encontrado.</div>;
    }

    return (
        <div className="container my-5">
            <h1 className="text-start mb-4 fs-4">Titans (Total: {titanData.results.length})</h1>
            <div className="row g-4">
                {(titanData.results as EnhancedTitan[]).map((titan) => {
                    const safeImgSrc = titan.img ? getCleanImageUrl(titan.img) : '';

                    return (
                        <div key={titan.id} className="col-lg-3 col-md-6">
                            <div className="card h-100 shadow-sm titan-card">
                                {titan.img && (
                                    <img 
                                        src={safeImgSrc} 
                                        className="img-card-padrao" 
                                        alt={titan.name} 
                                        onError={handleError} 
                                    />
                                )}
                                <div className="card-body bg-secondary">
                                    <h5 className="card-title text-primary text-white">{titan.name}</h5>

                                    <p className="card-text text-white">
                                        <span className="fw-bold">Altura:</span> {titan.height}
                                    </p>

                                    <p className="card-text text-white">
                                        <span className="fw-bold">Portador Atual:</span> {titan.inheritorName}
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