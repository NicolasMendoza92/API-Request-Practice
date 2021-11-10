
import axios from 'axios';
import { useState } from 'react';
import { Table, Button, Spinner } from 'react-bootstrap';
import { leerDeLocalStorage } from '../utils/localStorage';
import ModalEditMeme from './ModalEditMeme';

export default function TableMemes(props) {

    const [isLoading, setIsLoading] = useState(false);
    const [isModal, setIsModal] = useState(false);
    // creamos este estado, por que aca guardamos los datos del meme que quiero editar, nosotros tenemos un listado de meme que esta en el array. 
    const [currentMeme, setCurrentMeme] = useState({});

    const handleClose = () => setIsModal(false);

    const deleteMeme = async (_id) => {
        setIsLoading(true);

        const tokenLocal = leerDeLocalStorage('token') || {};
        const headers = { 'x-auth-token': tokenLocal.token };
        // ponemos el id ya que lo usamos antes como parametro de la fn 
        await axios.delete(`http://localhost:4000/api/memes/${_id}`, { headers });
        // aca llamamos a la prop que definimos en app, que primero le pasamos a admin y despues a tableMemes
        await props.actualizarMemes();
        setIsLoading(false);
    };

    const editMeme = (meme) => {
        setIsModal(true);
        // y aca lo seteamos al estado cuando toco edit 
        setCurrentMeme(meme);
    };

// el submit es la fn que uso para hacer el llamado a la API 
    const handleSubmitEdit = async (e) => {
        setIsLoading(true);
        e.preventDefault();
        const tokenLocal = leerDeLocalStorage('token') || {};
        const headers = { 'x-auth-token': tokenLocal.token };
        // aca hago la consulta a la ruta, con el Id, luego con el parametro "currentMeme" que le enviara los datos serian los body (title, image), y el headers es para validar el usuario, manda los datos del token
        await axios.put(`http://localhost:4000/api/memes/${currentMeme._id}`, currentMeme, { headers });
        await props.actualizarMemes();
        setIsLoading(false);
        handleClose();
    };

    const handleChange = (event) => {
        const { value, name } = event.target;
        // cada vez que se modifique un estado o algo hacemos que se modifique el valor que habia 
        const updatedMeme = { ...currentMeme, [name]: value };
        setCurrentMeme(updatedMeme);
    };

    return (
        <div className="position-relative">
            <Table striped bordered hover variant="dark">
                <tbody>
                    {props.memes.length === 0 ? 'no hay memes colgados' :
                        // aca usamos la prop meme para luego acceder a lo que quiera
                        props.memes.map((meme, i) => (
                            <tr key={i}>
                                <td><img src={meme.image} alt="" style={{ width: '18rem' }} /></td>
                                <td>{meme.title}</td>
                                {/* la hacemos fn flecha para pasarle parametros, el meme._id va a venir de el map qe hacemos y es el dato */}
                                <td> <Button onClick={() => deleteMeme(meme._id)} className="btn-danger">Borrar</Button> </td>
                                <td> <Button onClick={() => editMeme(meme)} className="btn-primary">edit</Button> </td>
                            </tr>
                        ))}
                </tbody>
            </Table>
            {
                isLoading && (
                    <div
                        style={{ zIndex: 2, backgroundColor: '#00000017' }}
                        className="position-absolute top-0 w-100 h-100 d-flex justify-content-center align-items-center">
                        <Spinner animation="border" role="status" />
                    </div>
                )
            }
            <ModalEditMeme
                isModal={isModal}
                onClose={handleClose}
                onSubmit={handleSubmitEdit}
                // aca le envio las propuedades que quiero que use y que se cambien 
                title={currentMeme.title}
                image={currentMeme.image}
                onChange={handleChange}
                isLoading={isLoading}
            />
        </div >
    );
}


