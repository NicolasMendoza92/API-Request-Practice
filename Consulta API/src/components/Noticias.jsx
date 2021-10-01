// siempre estar atento a los importes
import Noticia from './Noticia';
import { useEffect, useState } from 'react';
import {Button} from 'react-bootstrap';
import axios from 'axios';

// hacemos que reciba datos por parametros (al cual podamos acceder a uss propiedades) -  en este caso de props accedemos al array "noticias" que creamos en app.jsx y a ese lo recorremos con map
export default function Noticias() {

    // cremos un estado, la funcion useState nos devuelve un estado y lo debemos importar por que es una propiedad de react. y luego con "onChange" hago los llamados a los estados   
    const [category, setCategory] = useState('');
    const [country, setCountry] = useState('ar');
    // el estado inicial es la pagina 1
    const [page,setPage] = useState(1);
    // creamos la vble que se llama noticias 
    const [noticias, setNoticias] = useState([]);
    console.log(noticias)

    // usamos este hook que es una funcion que controla cuando se disparan los efecto secundarios 
    // await palabra reservada usamos cuando tengamos una funcion asincronica (cuando se ejecute el codigo funciona sin depender de lo otro) - es decir se llama a la funcion, se ejecuta y cuando termine se ejecuta lo que esta despues del await   

    useEffect(() => {
        const request = async () => {
            // manera facil de ejecutar algo sin necesidad de IF-y else, try y catch (jsx intenta resolver un bloque de codigo las veces que yo lo indique, en este caso si sale, entonces ejecutara "response" - y cuando ejecujete response va a ejecutar "new" y luego hago finaliza con setNoticias - si algo pasa ejecuta el "catch" y no me traba la ejecucion)
            try {
            // sintaxis para traer info de una API - solo cambia "articles" - aca puedo acceder a todas las prop y vbales que me tiene la API
            const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&page=${page}&apiKey=22151cac8ef24f039026871a8cc0ee62`);
            const news = response.data.articles;
            setNoticias(news)    
            } catch (error) {
                alert('Hubo un error en la consulta del servidor')
            }
        }
        request();
        // recibe como parametro un array -  cada vez que cambia un estado, todo el codigo se vuelve a ejecutar, queremos que la funcion se ejecute cuando se carga el componente y el array de dependencias es para eso-- indico la vble donde esta el estado de el que quiero que dependa  
    }, [category, country,page]);

    const changeCategory = (event) => {
        // funcion que setea el estado y le pasamos por parametro los datos que queremos actualizar 
        setCategory(event.target.value)
    };

    const changeCountry = (event) => {
        setCountry(event.target.value)
    };
    const previusDisabled = page === 1;


    // tenemos que agregar una prop "key" para que siempre que haya algo que retornar algo que conlleve un array y siempre ponemos un dato unico. si no tiene id , se coloca un "i"
    // const mapNoticias = props.noticias.map((noti) => <Noticia key={noti.id} noticia={noti} />);

    // ahora no recorre una props, sino que derecho a noticias - por que en app.jsx no puse nada -  ya no me hace falta el array news del principio 
    const mapNoticias = noticias.map((noti) => <Noticia key={noti.url} noticia={noti} />);
    //    cambiamos el noti.id por noti.url por que id no era una propiedad que tenia el objeto noticias en la API, pero si url

    return (
        <div>
            <h2>Noticias</h2>
            <form>
                <label htmlFor="category">categoria</label>
                {/* selectCategory es un callback-- por que es una fn que le pasamos la declaracion, osea cuando el evento ocurra llamamos a esta funcion */}
                <select name="category" id="category" onChange={changeCategory}>
                    {/* en el value pongo lo que dice en newapi */}
                    <option value="general">General</option>
                    <option value="sports">Deportes</option>
                    <option value="entertainment">Entretenimiento</option>
                </select>
                <label htmlFor="country">Pais</label>
                <select name="country" id="country" onChange={changeCountry}>
                    {/* en el value pongo lo que dice en newapi */}
                    <option value="ar">Argentina</option>
                    <option value="us">Usa</option>
                    <option value="jp">Japon</option>
                </select>
            </form> 
            <div className="d-flex flex-wrap">
                {mapNoticias}
            </div>
            <div>{page}</div>
            {/* puedo hacer asi, o puedo guardarlo en una vble const=changePage=(evetn) , asi como hice con category y country */}
            <Button onClick={()=>{setPage(page-1)}}disabled ={previusDisabled}>Previus</Button>
            {/* aca vemos si el array esta vacio, consultamos con la propiedad length del array noticias que habiamos definido antes */}
            <Button onClick={()=>{setPage(page+1)}} disabled={noticias.length === 0}>Next</Button>
        </div>
    );
}
