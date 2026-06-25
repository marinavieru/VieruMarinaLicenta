import { useState } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import heroBg from '../assets/images/9721900-minimalist-cat-wallpaper.png';

const HomeScreen = () => {
  const [roomType, setRoomType] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const navigate = useNavigate();

  const searchHandler = () => {
    navigate(`/search?type=${roomType}&checkIn=${checkIn}&checkOut=${checkOut}`);
  };

  return (
    <div
      className="home-hero"
      style={{ backgroundImage: `url(${heroBg})`, position: 'relative' }}
    >
      <div className="search-overlay">
        <h1 className="home-title">Bucură-te de vacanță!</h1>
        <h2 className="home-title">Avem noi grijă de pisica ta</h2>

        <Form className="search-box mb-4">
          <Row>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Tip Cameră</Form.Label>
                <Form.Select
                  value={roomType}
                  onChange={(e) => setRoomType(e.target.value)}
                >
                  <option value="">Toate</option>
                  <option value="standard">Standard</option>
                  <option value="deluxe">Deluxe</option>
                  <option value="VIP">VIP</option>
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={3}>
              <Form.Group>
                <Form.Label>Check-in</Form.Label>
                <Form.Control
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                />
              </Form.Group>
            </Col>

            <Col md={3}>
              <Form.Group>
                <Form.Label>Check-out</Form.Label>
                <Form.Control
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                />
              </Form.Group>
            </Col>

            <Col md={2} className="d-flex align-items-end">
              <Button variant="primary" className="w-100" onClick={searchHandler}>
                Caută
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
};

export default HomeScreen;