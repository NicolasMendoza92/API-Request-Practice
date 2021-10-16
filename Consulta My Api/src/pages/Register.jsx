
import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { Button, Col, Container, Form, InputGroup, Row } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'

export default function Register() {


    const [input, setInput] = useState({ name: '', email: '', password: '' });
    const history = useHistory ();

    const handleChange = (e) => {
        const { value, name } = e.target;
        const newInput = { ...input, [name]: value };
        setInput(newInput)

    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:4000/api/auth/register', input);
            alert('registro con exito');
            // aca hacemos un cambio de ruta con el history.push
            history.push('/login')
        } catch (error) {
            console.error(error)
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
                                required
                                type="text"
                                onChange={(e) => handleChange(e)}
                                placeholder="Name"
                            />
                        </Form.Group>
                        <Form.Group as={Col} md="4" controlId="validationCustom02">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                name="email"
                                required
                                type="email"
                                onChange={(e) => handleChange(e)}
                                placeholder="Correo Electronico"
                            />
                        </Form.Group>
                        <Form.Group as={Col} md="4" controlId="validationCustomUsername">
                            <Form.Label>Password</Form.Label>
                            <InputGroup hasValidation>
                                <Form.Control
                                    name="password"
                                    required
                                    type="password"
                                    placeholder="Contraseña"
                                    aria-describedby="inputGroupPrepend"
                                />
                            </InputGroup>
                        </Form.Group>
                    </Row>
                    <Row>
                        {/* boton que llama a la funcion HandleSubmit */}
                        <Button type="submit">Submit form</Button>
                    </Row>
                    <Row>
                        <Link to="/login">Ya tienes cuenta?</Link>
                    </Row>
                </Form>
            </div>
        </Container>
    )
}
