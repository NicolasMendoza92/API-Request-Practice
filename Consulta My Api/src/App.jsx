import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// estos componentes, son los que van a envolever a los componentes y ya me habilita la navegacion por react-router-dom
import { Route, Switch, Redirect } from 'react-router-dom';
import { NavbarRB } from './Components/navbar/NavbarRB';
import { Container } from 'react-bootstrap';
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


// ya los estados no vienen del local, sino que usamos useEffect, y hacemos logica con eso dentro de la app 

const tokenLocal = leerDeLocalStorage('token') || {};

function App() {

  // dejamos a memes como un array vacio al inicio y cuando llega la consulta se va compeltando.
  const [memes, setMemes] = useState([]);
  // al principio es un objeto vacio y cuando va haciendo las consultas "get" va llenadose
  const [user, setUser] = useState({});

    // esto seria lo que reemplaza al localStorage de setUser
  useEffect(() => {
    // aca ponemos la condicion, de que solo se setee el usuario cuando haya token 
    if (!tokenLocal.token) return;

    const request = async () => {
      // creamos la vble que guarde el token del user logeado, y lo traemos del localstorage lo definimos a la hora de guardar como token - luego lo enviamos como parametro asi como hicimos con las consulta a las api, asi como parametro (params)
      const headers = { 'x-auth-token': tokenLocal.token };
      const response = await axios.get('http://localhost:4000/api/auth', { headers });
      setUser(response.data);
    }
    request();
  })

  // esto seria lo que reemplaza al localStorage de setMemes
  useEffect(() => {
    const request = async () => {
      // accedemos a nuestra API y consultamos con los daatos que acaban de llegar s
      const response = await axios.get('http://localhost:4000/api/memes');
      setMemes(response.data);
    };
    request();
  }, [])

  // definimos la vble condicion "isAdmin", para usarla luego
  const isAdmin = user.role === 'admin';

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
            <Login />
          </Route>

          <Route path="/register">
            <Register />
          </Route>

          {/* aca estamos condionando a la ruta, para que cuando el user logeado sea admin, aparezcan estas dos rutas de navegacion */}
          {isAdmin && (
            <Route path="/admin">
              <Admin memes={memes} setMemes={setMemes} user={user} />
            </Route>
          )}

          {isAdmin && (
            <Route path="/perfil">
              <Perfil user={user} setUser={setUser} />
            </Route>
          )}

          {/* se define un identificador para un meme en detalle, entonces dentro de la ruta Meme puedo acceder a otra que es una particular y asi puedo hacer muchas */}
          <Route path="/meme/:memeId">
            <DetalleMeme />
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
