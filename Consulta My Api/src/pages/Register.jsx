import { useState } from 'react';
import axios from 'axios';
import { Button, Col, Container, Form, InputGroup, Row } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'

export default function Register() {

    const [input, setInput] = useState({ name: '', email: '', password: '' });
    const history = useHistory();

    const handleChange = (e) => {
        const { value, name } = e.target;
        const newInput = { ...input, [name]: value };
        setInput(newInput);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:4000/api/auth/register', input);
            alert('Registro exitoso');
            history.push('/login');
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Container>
            <div className="d-flex flex-column mx-2 mt-2">
                <h2>Registro</h2>
                <Form onSubmit={handleSubmit}>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="4" controlId="validationCustom01">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                              name="name"
                              onChange={(e) => handleChange(e)}
                              required
                              type="text"
                              placeholder="Nombre"
                            />
                        </Form.Group>
                        <Form.Group as={Col} md="4" controlId="validationCustom02">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                  name="email"
                                  onChange={(e) => handleChange(e)}
                                  required
                                  type="text"
                                  placeholder="email"
                            />
                        </Form.Group>
                        <Form.Group as={Col} md="4" controlId="validationCustomUsername">
                            <Form.Label>Password</Form.Label>
                            <InputGroup hasValidation>
                                <Form.Control
                                     minLength="6"
                                     name="password"
                                     onChange={(e) => handleChange(e)}
                                     type="password"
                                     placeholder="****"
                                     aria-describedby="inputGroupPrepend"
                                     required
                                />
                            </InputGroup>
                        </Form.Group>
                    </Row>
                    <Row>
                        {/* boton que llama a la funcion HandleSubmit */}
                        <Button type="submit">Registrar</Button>
                    </Row>
                    <Row>
                        <Link to="/login">Ya tienes cuenta?</Link>
                    </Row>
                </Form>
            </div>
        </Container>
    )
}
