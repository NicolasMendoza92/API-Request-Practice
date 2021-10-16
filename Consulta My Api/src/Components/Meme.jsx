
import React from 'react'
import { Card, Button} from 'react-bootstrap'
import { Link } from 'react-router-dom';
import './meme.css'

export default function Meme(props) {

    return (
        <Card style={{ width: '18rem'}}>
            <Card.Img variant="top" src={props.meme.image} />
            <Card.Body>
                <Card.Title className="text-center">{props.meme.title}</Card.Title>
                {/* el signo de pregunta es como una facilidad que me da react, solo aparece cuando existe, eso solo se puede utilizar en obejetos */}
                {props.meme.creador && <span> Creador: {props.meme.creador?.name} </span>}
            </Card.Body>
            <Button as={Link} to={`/meme/${props.meme.id}`}>Ver Detalle</Button>
        </Card>
    )
}

