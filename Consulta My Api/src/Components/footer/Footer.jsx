
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col} from 'react-bootstrap'
import './footer.css';

export default function Footer() {
  return (
    <div className="bg-black mt-auto text-light footer">
      <Row>
        <Col>
        <div>
          Hola
        </div>
        </Col>
        <Col>
        <div>
         Practica
        </div>
        </Col>
        <Col>
        <div>
          Consulta Api
        </div>
        </Col>
      </Row>
    </div>
  );
}

