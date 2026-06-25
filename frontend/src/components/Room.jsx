import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Room = ({ room, checkIn, checkOut }) => {
  return (
    <Card className='my-3 p-3 rounded'>
      <Link to={`/room/${room._id}?checkIn=${checkIn}&checkOut=${checkOut}`}>
        <Card.Img src={room.image} variant='top' />
      </Link>

      <Card.Body>
        <Link to={`/room/${room._id}?checkIn=${checkIn}&checkOut=${checkOut}`}>
          <Card.Title as='div' className='product-title'>
            <strong>{room.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as='h3'>
          {room.price} RON
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Room;
