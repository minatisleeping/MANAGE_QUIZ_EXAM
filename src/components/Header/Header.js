import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { useSelector } from 'react-redux'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { NavLink, useNavigate } from 'react-router-dom'

const Header = () => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated)
  // const account = useSelector((state) => state.user.account)

  const navigate = useNavigate()

  const handleLogin = () => navigate('/login')
  const handleRegister = () => navigate('/register')

  return (
    <Navbar expand='lg' bg='light'>
      <Container>
        {/* <Navbar.Brand href='#home'>Minat</Navbar.Brand> */}
        <NavLink to='/' className='navbar-brand'>
          Minat
        </NavLink>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='me-auto'>
            <NavLink to='/' className='nav-link'>
              Home
            </NavLink>
            <NavLink to='/user' className='nav-link'>
              User
            </NavLink>
            <NavLink to='/admin' className='nav-link'>
              Admin
            </NavLink>
          </Nav>
          <Nav>
            {isAuthenticated === false ? (
              <>
                <button className='btn-login' onClick={() => handleLogin()}>
                  Log In
                </button>
                <button className='btn-signup' onClick={() => handleRegister()}>
                  Sign Up
                </button>
              </>
            ) : (
              <NavDropdown title='Settings' id='basic-nav-dropdown'>
                <NavDropdown.Item>Logout</NavDropdown.Item>
                <NavDropdown.Item>Profile</NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
