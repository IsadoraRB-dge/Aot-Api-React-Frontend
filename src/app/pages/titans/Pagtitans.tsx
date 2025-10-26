import { useState, useEffect } from 'react';
import type { TitanApiResponse, Titan } from"../../../types/Character"

const TITANS_API_URL = 'https://api.attackontitanapi.com/titans';
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
    return (
        <div className="container my-5">
            <h1 className="text-center mb-4">Titans (Total: {titanData?.info.count})</h1>
            <div className="row g-4">
                {titanData?.results.map((titan: Titan) => (
                    <div key={titan.id} className="col-lg-4 col-md-6">
                        <div className="card h-100 shadow-sm titan-card">
                            {titan.img && (

                                <img src={titan.img} className="card-img-top" alt={titan.name} style={{ height: '200px', objectFit: 'cover' }} />
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
                ))}
            </div>
        </div>
    )
}