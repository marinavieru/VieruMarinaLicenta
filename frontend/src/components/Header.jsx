import { useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { FaUser } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import { apiSlice } from '../slices/apiSlice';

const Header = () => {
    const { userInfo } = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [logoutApiCall] = useLogoutMutation();

    const logoutHandler = async () => {
        try {
            await logoutApiCall().unwrap();
            dispatch(logout());
            dispatch(apiSlice.util.resetApiState());
            navigate('/login');
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <header>
        <Navbar expand="lg" collapseOnSelect className="custom-navbar">
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand>
                            Hotelul Pisicos
                        </Navbar.Brand>
                    </LinkContainer>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">

                            {!userInfo && (
                                <LinkContainer to="/login">
                                    <Nav.Link>
                                        <FaUser /> Autentificare
                                    </Nav.Link>
                                </LinkContainer>
                            )}

                            {userInfo && (
                                <NavDropdown title={userInfo.name} id="username" align="end">

                                    {/* Profil */}
                                    <LinkContainer to="/profile">
                                        <NavDropdown.Item>Profil</NavDropdown.Item>
                                    </LinkContainer>

                                    {/* User normal  */}
                                    {!userInfo.isAdmin && (
                                        <LinkContainer to="/mybookings">
                                            <NavDropdown.Item>Rezervări</NavDropdown.Item>
                                        </LinkContainer>
                                    )}

                                    {/* Doar admin */}
                                    {userInfo.isAdmin && (
                                        <>
                                            <NavDropdown.Divider />
                                            <LinkContainer to="/admin/roomlist">
                                                <NavDropdown.Item>Admin: Camere</NavDropdown.Item>
                                            </LinkContainer>
                                            <LinkContainer to="/admin/userlist">
                                                <NavDropdown.Item>Admin: Utilizatori</NavDropdown.Item>
                                            </LinkContainer>
                                            <LinkContainer to="/admin/bookinglist">
                                                <NavDropdown.Item>Admin: Rezervări</NavDropdown.Item>
                                            </LinkContainer>
                                        </>
                                    )}

                                    <NavDropdown.Divider />
                                    <NavDropdown.Item onClick={logoutHandler}>
                                        Deconectare
                                    </NavDropdown.Item>

                                </NavDropdown>
                            )}

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};

export default Header;
