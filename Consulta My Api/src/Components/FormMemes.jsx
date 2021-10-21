
import axios from 'axios';
import { useState } from 'react';
import { Button, Form, InputGroup, Row, Spinner } from 'react-bootstrap';
import { leerDeLocalStorage } from '../utils/localStorage';



export default function FormMemes(props) {
    const { setMemes } = props;
    const [validated, setValidated] = useState(false);
    // ahora usamos estados para tomar la informacion del usuario -  antes lo usabamos con onChange
    const [input, setInput] = useState({ title: '', image: '' });
    // este estado es muy usado para agregar spiners
    const [isLoading, setIsLoading] = useState(false);


    // aca recibimos los datos del formulario (funcion para eso)
    const handleChange = (event) => {
        const { value, name } = event.target;
        // usamos spread sintax, con los tres puntos e input conservamos los datos que tenian previamente 
        const newInput = { ...input, [name]: value };
        setInput(newInput)
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        event.stopPropagation();
        setValidated(true);

        const form = event.currentTarget;

        if (form.checkValidity() === true) {
            // antes de hacer la consulta, se llama al setloading
            setIsLoading(true);
    
            const tokenLocal = leerDeLocalStorage('token') || {};
            // con esta linea verificamos si el user esta logeado 
            const headers = {'x-auth-token': tokenLocal.token };
            // hacemos un post a la ruta y lo que necestiamos es el titulo y la imagen, que es lo que tenemos guardado en el input (lo que user pone ahi) - tenemos los dos parametros, header e input 
            await axios.post(' http://localhost:4000/api/memes', input , {headers});

            // aca tambien, a la hora de crear un meme con post, tambien consultamos con get y lo setea al estado. 
            const response = await axios.get('http://localhost:4000/api/memes');
            setMemes(response.data);

            // cuando termine la consulta, se setea como al inicio
            setIsLoading(false);
        }
    };
    return (
        <>
            <Form
                noValidate
                validated={validated}
                onSubmit={handleSubmit}
                className="card mt-5 p-5 mx-auto mb-2"
                style={{ width: '500px' }}
            >
                {/* aca se pone el id que tiene el input */}
                <Form.Group controlId="title">
                    <Form.Label>Titulo</Form.Label>
                    <Form.Control
                        name="title"
                        onChange={(e) => handleChange(e)}
                        required
                        type="text"
                        placeholder="Meme"
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-2" controlId="image">
                    <Form.Label>Imagen</Form.Label>
                    <InputGroup hasValidation>
                        <Form.Control
                            name="image"
                            onChange={(e) => handleChange(e)}
                            type="text"
                            placeholder="http://meme.jpg"
                            aria-describedby="inputGroupPrepend"
                            required
                        />
                        <Form.Control.Feedback type="invalid">Imagen requerida!</Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
                <Row>
                    <Button type="submit" className="mx-auto">
                        Crear Meme
                        {/* cuando hacemos el envio del meme, debe aparecer el spinner */}
                        {isLoading && (
                            <Spinner animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                        )}
                    </Button>
                </Row>
            </Form>
        </>
    );
}
