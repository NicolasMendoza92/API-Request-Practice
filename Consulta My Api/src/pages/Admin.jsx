
import FormMemes from '../Components/FormMemes';
import TableMemes from '../Components/TableMemes';

// ahora tenemos que obtener el dato de memes, osea al componente admin en app le pasamos dos datos ahora lo tenemos que desectructurar aca como parametro de la funcion.
export default function Admin( props ) {
    const { memes, setMemes } = props;
    return (
        <>
            <h2 className="mt-5">Formulario Crear Meme</h2>
            <FormMemes setMemes={setMemes} />
            <TableMemes actualizarMemes={props.actualizarMemes} memes={memes} />
        </>
    );
}
