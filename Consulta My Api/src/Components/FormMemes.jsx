
import { useState } from 'react';
import { Button, Form, InputGroup, Row } from 'react-bootstrap';
import { ID } from '../utils/id';
import { guardarEnLocalStorage } from '../utils/localStorage';

export default function FormMemes(props) {
    const { memes, setMemes } = props;
    const [validated, setValidated] = useState(false);
    // ahora usamos estados para tomar la informacion del usuario -  antes lo usabamos con onChange
    const [input, setInput] = useState({ title: '', image: '' });


    // aca recibimos los datos del formulario (funcion para eso)
    const handleChange = (event) => {
        const { value, name } = event.target;
        // usamos spread sintax, con los tres puntos e input conservamos los datos que tenian previamente 
        const newInput = { ...input, [name]: value };
        setInput(newInput)
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        setValidated(true);

        const form = event.currentTarget;

        if (form.checkValidity() === true) {
            // agregamos al array que ya creamos propiedades y elementos nuevos, lo que antes haciamos con push. Aca creamos una vble para que cada vez que se cree un meme se le asigne un ID (el id es util para despues diferenciar y usar "find" o delete)
            const newMeme = {...input, id:ID()};
            // creamos un objeto con spread syntax que copia lo que tiene, osea el input que ponga y le sumo el ID unico 
            const newArray = [...memes, newMeme];
            setMemes(newArray);
            // aca a la funcion le debo poner los objetos que quiero guardar, si yo pongo memes en vez de newArray me guarda el anterior
            guardarEnLocalStorage({ key: 'memes', value: newArray });
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
                    </Button>
                </Row>
            </Form>
        </>
    );
}
