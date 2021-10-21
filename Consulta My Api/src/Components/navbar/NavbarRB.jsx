
// react-router-dom nos facilita tambien la navegacion sin recargar con el comp navLink, navlink nos da un indicio de que estamos parados en esa page o esa ruta
import { NavLink } from 'react-router-dom';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { leerDeLocalStorage } from '../../utils/localStorage';

export const NavbarRB = ({ user }) => {

  const tokenLocal = leerDeLocalStorage('token') || {};

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/" >Home</Nav.Link>
            {/* si no hay token logeado entonces aparecen los botones de login y registro */}
            {!tokenLocal.token && <Nav.Link as={NavLink} to="/login" >Login</Nav.Link>}
            {!tokenLocal.token && <Nav.Link as={NavLink} to="/register" >Registro</Nav.Link>}
            <Nav.Link as={NavLink} to="/perfil" >Perfil</Nav.Link>
            {/* cuando un usuario se logea, su prop role es igual a admin => se muestra el nav link admin */}
            {user.role === 'admin' && <Nav.Link as={NavLink} to="/admin" >Admin</Nav.Link>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

