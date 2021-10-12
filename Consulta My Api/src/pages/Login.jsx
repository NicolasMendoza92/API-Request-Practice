
import { useState } from 'react';
import { Button, Card, Col, Container, Form, InputGroup, Row } from 'react-bootstrap';
import axios from 'axios'

// const user = { name: 'rick', email: 'rick@gmail.com', password: '123456', role: 'admin' };

// al tener el setUser, lo podemos desectructurar 
export default function Login({ setUser }) {

    const [validated, setValidated] = useState(false);
    // aca debo elegir los parametros que va a tener la funcion y su estado incial es email y password vacios  
    const [input, setInput] = useState({ email: '', password: '' });
    // el useHistory, me sirve como un redirect, y luego lo invoco este estado con un history.push (y /"ruta que quiero")
    // const history = useHistory();

    const handleChange = (event) => {
        const { value, name } = event.target;
        const newInput = { ...input, [name]: value };
        setInput(newInput)
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        event.stopPropagation();
        setValidated(true);

        const form = event.currentTarget;

        // cuando estan bien los datos, usamos el metodo push, entonces lo redirecciona de una a la pag admin. 

        // consultar al Back a la ruta /login, con el usuario y contraseña 
        // hacemos una consulta tipo "post" por que estamos enviando datos a traves de body  -- la consulta es en el localhost de postman - y enviamos un segundo parametro con un objeto y todos los datos que enviamos en el body (en este caso lo que tenga email y password, eso ya lo tenemos en el input). 
        if (form.checkValidity() === true) {

            const response = await axios.post('http://localhost:4000/api/auth/login', input);
            console.log (response)

            // if () {
            //     alert('Hola Admin' + user.name)



            //     // setUser(user);
            //     // guardarEnLocalStorage({ key: 'user', value: user });
            //     history.push('/admin');
            // } else {
            //     alert('datos incorrectos')
            //     form.reset();
            //     // seteamos el input con un campo vacio, entonces debemos agregar que el valor del input dependa del estado 
            //     setInput({});
            // }

        }
    };

    return (
        <Container>
            <Row>
                <Col xs={12} sm={8} md={6} className="mx-auto my-5">
                    <Card className="border">
                        <Card.Header className="bg-info">
                            <h4 className="text-white">MeMes</h4>
                        </Card.Header>
                        <Card.Body>
                            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                <Form.Group controlId="validationCustom02">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        name="email"
                                        value={input.email}
                                        onChange={(e) => handleChange(e)}
                                        required
                                        type="email"
                                        placeholder="Last name"
                                    />
                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group controlId="validationCustomUsername">
                                    <Form.Label>Password</Form.Label>
                                    <InputGroup hasValidation>
                                        <Form.Control
                                            minLength="6"
                                            name="password"
                                            value={input.password}
                                            onChange={(e) => handleChange(e)}
                                            type="password"
                                            placeholder="****"
                                            aria-describedby="inputGroupPrepend"
                                            required
                                        />
                                        <Form.Control.Feedback type="invalid">s
                                            Password is required!
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Form.Group>
                                <Row>
                                    <Button type="submit" className="mx-auto mt-4">
                                        Iniciar Sesión
                                    </Button>
                                </Row>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}
