import { Row, Col } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import { useGetAvailableRoomsQuery } from '../slices/roomsApiSlice';
import Room from '../components/Room';
import Loader from '../components/Loader';
import Message from '../components/Message';

const SearchResultsScreen = () => {
  const [params] = useSearchParams();

  const checkIn = params.get('checkIn');
  const checkOut = params.get('checkOut');
  const type = params.get('type');

  const { data: rooms, isLoading, error } = useGetAvailableRoomsQuery({
    checkIn,
    checkOut,
    type,
  });

  return (
  <div className="results-hero">
    <h1 className="results-title">Disponibilitate</h1>

    {isLoading ? (
      <Loader />
    ) : error ? (
      <Message variant="danger">
        {error?.data?.message || error.error}
      </Message>
    ) : rooms.length === 0 ? (
      <Message>Camere indisponibile pentru perioada selectată</Message>
    ) : (
      <div className="results-grid">
        <Row>
          {rooms.map((room) => (
            <Col key={room._id} sm={12} md={6} lg={4} xl={3}>
              <Room
                room={room}
                checkIn={checkIn}
                checkOut={checkOut}
              />
            </Col>
          ))}
        </Row>
      </div>
    )}
  </div>
);
};

export default SearchResultsScreen;
