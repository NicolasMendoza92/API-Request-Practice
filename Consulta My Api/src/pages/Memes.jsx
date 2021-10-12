
import Meme from '../Components/Meme';
import './memes.css'


const Memes = ({ memes }) => {

    // la i se la pone para que no salga el error del valor unico en console de la app- 
    const mapMemes = memes.map((meme,i) => (<Meme key={i} meme={meme} />));

    return (
        <>
            <h2>Memes</h2>
            <div className="d-flex flex-wrap justify-content-between">{mapMemes}</div>
        </>
    );
};

export default Memes;
