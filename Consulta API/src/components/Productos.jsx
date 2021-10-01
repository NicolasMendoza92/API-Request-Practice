
import React from 'react'
import { Container,Row } from 'react-bootstrap';
import Producto from './Producto'

// usamos props como parametro de la funcion, y despues como que traigo las propiedades que sean "props.title" - o directamente con destruturacion y se llama a la propiedad de la vble que creamos. 

const Productos = ({title,productos}) => {

    // en vez de generar string, generamos componentes y vamos haciendo como ramas y carpetas a las que hago referencia. Ya no hace falta hacer un join o innerhtml y es mas especifico con los errores 

const mapProductos =  productos.map((producto) => <Producto producto={producto}/>);

    return (
        <Container>
            <h3>{title}</h3>
            <Row md={4}>
                {mapProductos}
            </Row>
            </Container>
            )
}
            export default Productos
