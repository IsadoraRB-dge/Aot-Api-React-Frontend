import {useState, useEffect} from 'react';
import type { Character } from '../../../types/Character';
import { useParams } from 'react-router-dom';

const { id } = useParams<{ id: string }>();
const CHARACTER_API_URL = `https://api.attackontitanapi.com/characters/${id}`

const initialCharacterState: Character = {
  id: 0,
  name: 'Carregando...',
  gender: '',
  img: '',
};
export const Pagpersonagens = () => {
    const [character, setCharacter] = useState<Character>(initialCharacterState);

    useEffect(() => {
        const fetchCharacter = async () => {
            try {
                const response = await fetch(CHARACTER_API_URL);
                const data: Character = await response.json();
                setCharacter(data);  
            } catch (err) {
                console.error("Erro ao buscar o personagem:", err);
            } 
        };

        fetchCharacter();
    }, []);

    return (
        <div className="container my-5">
            <h1 className="text-center mb-4">{character.name}</h1>
            
            <div className="card shadow-lg">
                <div className="row g-0">
                    <div className="col-md-4">
                        {character.img ? (
                             <img 
                                src={character.img} 
                                className="img-fluid rounded-start" 
                                alt= "imagem_personagens"
                                style={{ maxHeight: '400px', width: '100%', objectFit: 'cover' }}
                            />
                        ) : (
                            <div className="d-flex align-items-center justify-content-center bg-light" style={{ height: '400px' }}>
                                <p className="text-muted">Sem Imagem</p>
                            </div>
                        )}
                    </div>
                    
                    <div className="col-md-8">
                        <div className="card-body">
                            <h2 className="card-title border-bottom pb-2 mb-3">{character.name}</h2>
                            
                            <p className="card-text">
                                <span className="fw-bold">ID:</span> {character.id}
                            </p>

                            <p className="card-text">
                                <span className="fw-bold">Gênero:</span> {character.gender || 'N/A'}
                            </p>
                            <div className="mt-4">
                                <a href="#" className="btn btn-primary">Voltar</a> {/**Lembrar do botão de voltar */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}