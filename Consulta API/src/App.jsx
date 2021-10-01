
import './App.css';
// este import me sirve para usar estilos y cosas de reactbootstrap, sin la necesidad de colocar className 
import 'bootstrap/dist/css/bootstrap.min.css';
// import Contador from './components/Contador';
// la comentamos a la vieja TheNav para usar la otra de reactbootstrap
// import {TheNav} from './components/TheNav';
import { NavRB } from './components/TheNav';
import { Container } from 'react-bootstrap';
// import Productos from './components/Productos';
import Noticias from './components/Noticias';

// los codigos js se hacen antes del return y luego los puedo llamar con {}, cuando llamo al componente- y en el jsx al que hace referencia el componente tambien los tengo que llamar.

// let titular1 = "Producto Luffy"

// let titular2 = "Producto Zoro"

// puedo harcodear y hacer productos separados 

// let producto = {
//   id: 1,
//   nombre: 'funkoPop',
//   img:'https://img.dynos.es/img/1cb91/2062b/1315000305-0.jpg',
// };


// let producto2 = {
//   id: 2,
//   nombre: 'funkoPop',
//   img:'https://www.frikimasters.es/10063-large_default/funko-pop-one-piece-zoro-roronoa.jpg',
// };

// Ahora lo hago con un array y tambien hago referencia a esa vble 

// let titular = "Productos FUNKO POP"

// let productos = [
//  {
//   id: 1,
//   nombre: 'funkoPop',
//   img:'https://img.dynos.es/img/1cb91/2062b/1315000305-0.jpg',
//  },
// {
//   id: 2,
//   nombre: 'funkoPop',
//   img:'https://www.frikimasters.es/10063-large_default/funko-pop-one-piece-zoro-roronoa.jpg',
// }
// ]

// const news = [
//   {
//     id:1,
//     title: 'Ultimo Momento',
//     subtitle: '',
//     date: '10/10/2021',
//     description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nulla, nam similique cum quas molestias ullam! Quo temporibus neque a, natus, omnis minima praesentium exercitationem tempore rerum, itaque laboriosam asperiores aliquid',
//     thumbnail: 'https://www.colegiomayor.unileon.es/files/2016/07/noticias.png'
//   },
//   {
//     id:2,
//     title: 'Ultimo Momento',
//     subtitle: '',
//     date: '10/10/2021',
//     description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nulla, nam similique cum quas molestias ullam! Quo temporibus neque a, natus, omnis minima praesentium exercitationem tempore rerum, itaque laboriosam asperiores aliquid',
//     thumbnail: 'https://www.colegiomayor.unileon.es/files/2016/07/noticias.png'
//   },
//   {
//     id:3,
//     title: 'Ultimo Momento',
//     subtitle: '',
//     date: '10/10/2021',
//     description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nulla, nam similique cum quas molestias ullam! Quo temporibus neque a, natus, omnis minima praesentium exercitationem tempore rerum, itaque laboriosam asperiores aliquid',
//     thumbnail: 'https://www.colegiomayor.unileon.es/files/2016/07/noticias.png'
//   },
// ]

function App() {
  // las clases en react se pone className y se debe cerrar las etiquetas que en html no tenian cierre con el simbolo </> al final, como un input y como un hr por ejemplo.
  return (
    <div>
      <NavRB/>
      <Container>
        {/* <TheNav/> */}
        <h1>Hola Ray</h1>
        {/* <Contador/> */}
        {/* <Productos title = {titular} productos={productos}/> */}
        {/* <Productos title={titular1} producto={producto}/>
        <Productos title={titular2} producto={producto2}/> */}
        {/* al llamar al componente va a recibir un dato con el nombre en este caso le pusimos "noticias" y en la propiedad noticias va a aparecer el array "news" */}
        {/* <Noticias noticias={news}/> */}
        <Noticias/>
        {/* las noticias ya no la vamos a recibir por props, sino que la vamos a generar dentro del mismo comp - creamos una vble un array en "Noticias" */}
      </Container>
    </div>
  );
}

export default App;
