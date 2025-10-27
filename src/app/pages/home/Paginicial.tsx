
import Hange from "../../../assets/HnageZoe.jpg";

export const Paginicial = () => {
    return (
        // Use um container do Bootstrap para dar padding nas laterais
        <div className="container my-5"> 
            <article>
                
                <h3 className="text-center bg-secondary text-white py-3 mb-4">
                    Explore o denso e enigmático universo de Shingeki no Kyojin

                </h3>
                
                <figure> 
                    <img 
                        src={Hange} 
                        alt="Hange principal"
                        className="img-fluid img-hange-thumb float-start me-3" 
                    />
                </figure>
                
                <section>
                    <p>
                        Shingeki no Kyojin (Ataque dos Titãs) é um universo repleto 
                        de personagens complexos, como Hange Zoë, a líder de esquadrão 
                        que dedicou sua vida ao estudo e combate aos Titãs. 
                        A curiosidade e a inteligência de Hange são cruciais 
                        para a sobrevivência da humanidade. 
                        Navegue pelas seções para descobrir mais sobre os 
                        personagens, seus episódios mais marcantes e os mistérios 
                        dos Titãs!
                    </p>
                    
                </section>
                
                <div className="clearfix"></div> 

            </article>
        </div>
    )
}