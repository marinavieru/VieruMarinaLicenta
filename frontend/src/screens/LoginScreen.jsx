import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import { useLoginMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';
import heroBg from '../assets/images/9721900-minimalist-cat-wallpaper.png';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);

  const redirect = sp.get('redirect')
    ? decodeURIComponent(sp.get('redirect'))
    : '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div
      className="login-hero"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      <div className="login-overlay">

        <h1 className="login-title">Autentificare</h1>

        <Form className="login-box" onSubmit={submitHandler}>
          <Form.Group controlId="email" className="my-3">
            <Form.Label>Introdu adresă e-mail</Form.Label>
            <Form.Control
              type="email"
              placeholder="Introdu adresa e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="password" className="my-3">
            <Form.Label>Parolă</Form.Label>
            <Form.Control
              type="password"
              placeholder="Introdu parolă"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Button type="submit" variant="primary" className="w-100 mt-2" disabled={isLoading}>
            Autentificare
          </Button>

          {isLoading && <Loader />}
        </Form>

        <Row className="py-3">
          <Col>
            Utilizator nou?{' '}
            <Link to={redirect ? `/register?redirect=${encodeURIComponent(redirect)}` : '/register'}>
              Creează cont
            </Link>
          </Col>
        </Row>

      </div>
    </div>
  );
};

export default LoginScreen;
