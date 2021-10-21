import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// estos componentes, son los que van a envolever a los componentes y ya me habilita la navegacion por react-router-dom
import { Route, Switch, Redirect } from 'react-router-dom';
import { NavbarRB } from './Components/navbar/NavbarRB';
import { Container, Spinner } from 'react-bootstrap';
import Footer from './Components/footer/Footer';
import Memes from './pages/Memes';
import Login from './pages/Login';
import Perfil from './pages/Perfil';
import Admin from './pages/Admin';
import Register from './pages/Register';
import { useState } from 'react';
import { leerDeLocalStorage } from './utils/localStorage';
import DetalleMeme from './pages/DetalleMeme';
import { useEffect } from 'react';
import axios from 'axios';

function App() {

  // dejamos a memes como un array vacio al inicio y cuando llega la consulta se va compeltando.
  const [memes, setMemes] = useState([]);
  // al principio es un objeto vacio y cuando va haciendo las consultas "get" va llenadose
  const [user, setUser] = useState({});

  const [isLoading, setIsLoading] = useState(true)

  const requestUserData = async () => {
    setIsLoading(true);
    // ya los estados no vienen del local, sino que usamos useEffect, y hacemos logica con eso dentro de la app 
    const tokenLocal = leerDeLocalStorage('token') || {};
    // si existe token entonces hacemos la consulta 
    if (tokenLocal.token) {
      // creamos la vble que guarde el token del user logeado, y lo traemos del localstorage lo definimos a la hora de guardar como token - luego lo enviamos como parametro asi como hicimos con las consulta a las api, asi como parametro (params)
      const headers = { 'x-auth-token': tokenLocal.token };
      const response = await axios.get('http://localhost:4000/api/auth', { headers });
      setUser(response.data);
    }
    setIsLoading(false);
  };

  // esto seria lo que reemplaza al localStorage de setUser
  useEffect(() => {
    requestUserData();
  }, [])

  // lo hacemos fuera del useEffect, para que sea una vble global y no solo se llame dentro del useEffect, para que este consultando el backend todo el tiempo....esto seria lo que reemplaza al localStorage de setMemes, consulta el back y me trae lo que existe.
  const getMemes = async () => {
    // accedemos a nuestra API y consultamos con los daatos que acaban de llegar y los listamos ahi en la pestaña ppal
    const response = await axios.get('http://localhost:4000/api/memes');
    // seteamos el estado meme con lo que recibamos de la consulta a la api
    setMemes(response.data);
  };

  useEffect(() => {  
    getMemes();
  }, [])

  // definimos la vble condicion "isAdmin", para usarla luego
  const isAdmin = user.role === 'admin';

  if (isLoading) {
    return <>   
    Cargando...
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
    </>
  }

  return (
    <div className="footer-fix">
      {/* usamos la navbar como actualizadora de estados  */}
      <NavbarRB user={user} />
      <Container>
        {/* el comp switch es importante por que fuerza que se muestre una sola ruta a la vez */}
        <Switch>
          {/* la barra es como un comodin, comunmente se le pone a la ppal, debemos poner la palabra exact para que salga sino siempre aparece */}
          <Route path="/" exact>
            {/* aca se le comparte al componente memes, le damos una prop llamada memes con el valor del estado "memes" el que defini antes  */}
            <Memes memes={memes} />
          </Route>
          {/* ahora el componente de le damos la fn que actualice el estado y le damos el atributo "setUser" */}
          <Route path="/login">
            <Login requestUserData={requestUserData} />
          </Route>

          <Route path="/register">
            <Register />
          </Route>

          {/* aca estamos condionando a la ruta, para que cuando el user logeado sea admin, aparezcan estas dos rutas de navegacion */}
          {isAdmin && (
            <Route path="/admin">
              {/* ahora creamos la props, actualizarMemes y lo que va a mandar esa prop es la fn "getMemes" */}
              <Admin actualizarMemes={getMemes} memes={memes} setMemes={setMemes} />
            </Route>
          )}

          <Route path="/perfil">
            <Perfil user={user} setUser={setUser} />
          </Route>

          {/* se define un identificador para un meme en detalle, entonces dentro de la ruta Meme puedo acceder a otra que es una particular y asi puedo hacer muchas */}
          <Route path="/meme/:memeId">
            <DetalleMeme  memes={memes} />
          </Route>

          {/* esta ruta se la usara cuando no coincida ninguna de las otras, el * me sirve para eso, es un comodin para errores */}
          <Route path="*">
            <Redirect to="/404" />
          </Route>

          <Route path="/404">
            404
          </Route>

        </Switch>
      </Container>
      <Footer />
    </div>
  );
}

export default App;
