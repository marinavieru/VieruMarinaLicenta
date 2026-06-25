import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import { useRegisterMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';
import heroBg from '../assets/images/9721900-minimalist-cat-wallpaper.png';

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      const res = await register({ name, email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div
      className="register-hero"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      <div className="register-overlay">

        <h1 className="register-title">Creează Cont</h1>

        <Form className="register-box" onSubmit={submitHandler}>
          <Form.Group controlId="name" className="my-3">
            <Form.Label>Nume</Form.Label>
            <Form.Control
              type="text"
              placeholder="Introdu numele"
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="email" className="my-3">
            <Form.Label>Adresă de e-mail</Form.Label>
            <Form.Control
              type="email"
              placeholder="Introdu adresa de e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="password" className="my-3">
            <Form.Label>Parolă</Form.Label>
            <Form.Control
              type="password"
              placeholder="Introdu parola"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="confirmPassword" className="my-3">
            <Form.Label>Confirmare parolă</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirmare parolă"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>

          <Button type="submit" variant="primary" className="w-100 mt-2" disabled={isLoading}>
            Creează Cont
          </Button>

          {isLoading && <Loader />}
        </Form>

        <Row className="py-3">
          <Col>
            Cont existent?{' '}
            <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
              Intră în cont
            </Link>
          </Col>
        </Row>

      </div>
    </div>
  );
};

export default RegisterScreen;
