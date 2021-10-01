import React, { useState } from 'react'
import { Button } from 'react-bootstrap';
// La app de react maneja estados mas que variables, para crear un estado hay distintos componentes Hook como useState

const Contador = () => {
    // se coloca primero el componente "Estado" que quiero traer y luego el seteo del estado - luego tengo que importarlo desde react tocando el cubo, cosa que se ponga arriba entre {} 

    const [contador, setcontador] = useState(0)
    // cree otro estado y puedo hacerlos cruzar entre ellos 
    const [valor,setValor] = useState(0)

    const sumar = () => {
        setcontador(contador + 1)
    }
    const restar = () => {
        setcontador(contador - 1)
    }
    const restarDiez = (valor) => {
        setcontador(contador - valor)
    }

    // aca puedo poner de parametro un "valor" el cual puede ser un input del usuario y luego invocarlo entre (). con un parametro como evento y luego cambio string a entero. donde dice target es lo mismo que getelementbyid, para traer valores externos.
    const changeValor = (e) => {
        setValor (Number(e.target.value))
    }
    const sumarValor =() =>{
        setcontador(contador + valor)
    }

    return (
        <div>
            <h3>
                Contador : {contador}
            </h3>
            <Button variant="success" onClick={sumar} className="m-1">+1</Button>
            <Button variant="danger" onClick={restar} className="btn btn-primary m-1">-1</Button>
            <Button onClick={()=>restarDiez(10)} className="btn btn-primary m-1">-10</Button>
            <Button onClick={()=>setcontador(contador + 10)} className="btn btn-primary m-1">+10</Button>
            <div className="container">
                <p>Cuanto quiere agregar</p>
                <input className="form-control" type="number" onChange={changeValor}/>
                <Button onClick={sumarValor} className="btn btn-primary m-1"> Toca para Sumar: {valor} </Button>
            </div>
        </div>

    )
}

// en este caso como esta la linea export default, en la App.jsx no hace falta colocar {} en la linea import
export default Contador
