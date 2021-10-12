
// react-router-dom nos facilita tambien la navegacion sin recargar con el comp navLink, navlink nos da un indicio de que estamos parados en esa page o esa ruta
import { NavLink } from 'react-router-dom';
import { Container,Navbar,Nav} from 'react-bootstrap';

export const NavbarRB = ({user}) => {
    return (
        <Navbar bg="light" expand="lg">
  <Container>
    <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
        <Nav.Link as={NavLink} to="/" >Home</Nav.Link>
        <Nav.Link as={NavLink} to="/login" >Login</Nav.Link>
        {/* aca estoy haciendo la condicion, de que si se logea el usuario admin se muestren estas dos op de navegacion */}
        {user.role === 'admin' && <Nav.Link as={NavLink} to="/perfil" >Perfil</Nav.Link>}
        {/* cuando un usuario se logea, su prop role es igual a admin => se muestra el nav link admin */}
        {user.role === 'admin' && <Nav.Link as={NavLink} to="/admin" >Admin</Nav.Link>}
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
    )
}

