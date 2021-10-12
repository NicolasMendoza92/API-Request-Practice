import { Redirect, useParams } from 'react-router';
import MemeFull from '../Components/MemeFull';
import { leerDeLocalStorage } from '../utils/localStorage';

export default function DetalleMeme() {

    // useParams nos permite traer los objetos que nosotros definimos como /:"ruta"- osea si en la ruta en el buscador (host) ponemos ---> /meme/jj , el params nos trae ese valor --> "ruta":jj
    const { memeId } = useParams();
    // accedemos al array de memes trayendolo del local storege, esto hacemos por que no lo definimos como parametro de funcion, y aprovechamos que ya esta guardado en el local storege. (usamos la fn que creamos que es la que me trae de ahi la info)
    const memes = leerDeLocalStorage('memes')
    // usamos la logica de find (que encuetnre el que sea igual a meme - y acon el id tenemos esa posibilidad)
    const memeEncontrado = memes.find((m) => m.id === memeId);

    if (memeEncontrado === undefined) {
        return <Redirect to="/404" />;
    }

    return (
        <MemeFull meme={memeEncontrado} />
    );
}
