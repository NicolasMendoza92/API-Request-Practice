import { Card } from 'react-bootstrap';

export default function MemeFull(props) {
  return (
    <>
    <Card className="mx-auto" style={{ width: '30rem'}}>
            <Card.Img variant="top" src={props.meme.image} />
            <Card.Body>
                <Card.Title className="text-center">{props.meme.title}</Card.Title>
            </Card.Body>
        </Card>
    </>
  );
}

