
import axios from 'axios';
import { useState } from 'react';
import { Table, Button, Spinner } from 'react-bootstrap';
import { leerDeLocalStorage } from '../utils/localStorage';

export default function TableMemes(props) {

    const [isLoading, setIsLoading] = useState(false);

    const deleteMeme = async (id) => {
        setIsLoading(true);

        const tokenLocal = leerDeLocalStorage('token') || {};
        const headers = { 'x-auth-token': tokenLocal.token };
        // ponemos el id ya que lo usamos antes como parametro de la fn 
        await axios.delete(`http://localhost:4000/api/memes/${id}`, { headers });
        // aca llamamos a la prop que definimos en app, que primero le pasamos a admin y despues a tableMemes
        await props.actualizarMemes();
        setIsLoading(false);
    };

    return (
        <div className="position-relative">
        <Table striped bordered hover variant="dark">
            <tbody>
                {props.memes.length === 0 ? 'no hay memes colgados' :
                    props.memes.map(({ title, image, _id }, i) => (
                        <tr key={i}>
                            <td><img src={image} alt="" style={{ width: '18rem' }} /></td>
                            <td>{title}</td>
                            {/* la hacemos fn flecha para pasarle parametros, el id va a venir de el map qe hacemos y es el dato */}
                            <td> <Button onClick={() => deleteMeme(_id)} className="btn-danger">Borrar</Button> </td>
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
        </div >
    );
}


