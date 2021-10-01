import React from 'react'
import { Card, Button } from 'react-bootstrap'
import './noticia.css'

export default function Noticia(props) {

    // esta es una forma para acceder a las propiedades del objeto-- desectrusturando 
    const { noticia } = props;
    // me fijo que propiedaes tiene el objeto que yo traje de API y ahi las voy invocando 
    const {urlToImage, title, description, publishedAt,url } = noticia;

    return (
        <Card className="card-noticia m-2">
            <Card.Img variant="top" src={urlToImage} />
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <span>{publishedAt}</span>
                <Card.Text>
                    {description}
                </Card.Text>
                <Button href={url} target="_blank" variant="primary">Go To News</Button>
            </Card.Body>
        </Card>
    )
}

