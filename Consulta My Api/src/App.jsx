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
import { useState } from 'react';
import { leerDeLocalStorage } from './utils/localStorage';
import DetalleMeme from './pages/DetalleMeme';


// siempre que necesitemos cambio en pantalla, necesitamos usar estados. UseState - y con setSection hacemos participe al ususario (funcion que actualiza)

// cuando arranque la app debe leer de local y mostrame esto, para que cuando actualice no desaparerza, le llamamos 'memes' por que al momento de guardarlo en local tambien le llamamos a la key 'memes'
const memesLocal = leerDeLocalStorage('memes') || [];
const userLocal = leerDeLocalStorage('user') || {};

function App() {

  const [memes, setMemes] = useState(memesLocal);

  const [user, setUser] = useState(userLocal);

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
            <Login setUser={setUser} />
          </Route>

          {/* aca estamos condionando a la ruta, para que cuando el user logeado sea admin, aparezcan estas dos rutas de navegacion */}
          {isAdmin && (
            <Route path="/admin">
              <Admin memes={memes} setMemes={setMemes} user={user} />
            </Route>
          )}

          {isAdmin && (
            <Route path="/perfil">
              <Perfil user={user} />
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
