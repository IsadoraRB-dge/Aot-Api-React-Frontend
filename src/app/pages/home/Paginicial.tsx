import { Link } from 'react-router-dom';
import Hange from "../../../assets/HnageZoe.jpg";
import Aotcarrosel01 from "../../../assets/aot-carrosel01.jpg";
import Aotcarrosel02 from "../../../assets/aot-carrosel02.jpg";
import Aotcarrosel03 from "../../../assets/aot-carrosel03.jpg";


export const Paginicial = () => {
    return (
        // Use um container do Bootstrap para dar padding nas laterais
        <div className="container my-5"> 
            <article>
                
                <h3 className="text-center bg-secondary text-white py-3 mb-4">
                    Explore o denso e enigmático universo de Shingeki no Kyojin

                </h3>

                <div id="carouselExampleInterval" 
                    className="carousel slide mb-5 carousel-limitado" 
                    data-bs-ride="carousel">

                    <div className="carousel-inner">
                        
                        <div className="carousel-item active" data-bs-interval="10000">
                            <img 
                                src={Aotcarrosel01} 
                                className="d-block w-100" 
                                alt="Cena de Attack on Titan 1"
                            />
                        </div>
                    
                        <div className="carousel-item" data-bs-interval="2000">
                            <img 
                                src={Aotcarrosel02} 
                                className="d-block w-100" 
                                alt="Cena de Attack on Titan 2"
                            />
                        </div>
                        
                        <div className="carousel-item">
                            <img 
                                src={Aotcarrosel03} 
                                className="d-block w-100" 
                                alt="Cena de Attack on Titan 3"
                            />
                        </div>

                    </div>
                
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
               
                <div className="row align-items-center">
                
                    <div className="col-md-auto h-100">
                        <figure className="mb-0"> 
                            <img 
                                src={Hange} 
                                alt="Hange principal"
                                className="img-fluid img-hange-thumb me-3" 
                            />
                        </figure>

                        <div className="d-grid gap-2 mt-3"> 
                            <Link to="/characters" className="btn btn-primary btn-md">
                                Conheça outros personagens
                            </Link>
                        </div>
                    </div>
            
                    <div className="col d-flex align-items-center h-100">  

                        <section className ="w-100">
                            <p>
                                Shingeki no Kyojin (Ataque dos Titãs) 
                                é um universo repleto de histórias intensas e personagens marcantes.
                                Esta página serve como um guia para conhecer melhor o anime, apresentando 
                                informações sobre os personagens, os Titãs e os episódios que compõem essa jornada épica. 
                                Explore as seções e mergulhe no mundo de Attack on Titan!
                            </p>                          

                            <p>
                                Hange Zoë (Personagem ao lado) é uma das mentes mais brilhantes e curiosas do Corpo de Exploração. 
                                Apaixonada por entender os Titãs, ela combina inteligência, coragem e empatia,
                                sendo essencial na luta pela sobrevivência da humanidade.
                            </p>
                        </section>
                    </div>  
            </div>

            </article>
        </div>
    )
}