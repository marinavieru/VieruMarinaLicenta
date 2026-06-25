import { useSearchParams, useParams, useLocation, useNavigate } from 'react-router-dom';
import { useGetRoomDetailsQuery } from '../slices/roomsApiSlice';
import { Button } from 'react-bootstrap';
import { useCreateCheckoutSessionMutation } from '../slices/bookingsApiSlice';
import { useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';

const RoomScreen = () => {
  const { id: roomId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const { data: room, isLoading, error } = useGetRoomDetailsQuery(roomId);
  const { userInfo } = useSelector((state) => state.auth);

  const [params] = useSearchParams();
  const checkIn = params.get('checkIn');
  const checkOut = params.get('checkOut');

  const [createCheckoutSession] = useCreateCheckoutSessionMutation();

  const nights =
    checkIn && checkOut
      ? (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24)
      : 0;

  const totalPrice = nights * (room?.price || 0);

  const bookHandler = async () => {
    if (!userInfo) {
      navigate(`/login?redirect=${encodeURIComponent(location.pathname + location.search)}`);
      return;
    }

    try {
      const session = await createCheckoutSession({
        roomId,
        checkIn,
        checkOut,
        totalPrice,
      }).unwrap();

      window.location.href = session.url;
    } catch (err) {
      alert(err?.data?.message || 'Payment session error');
    }
  };

  return (
    <div className="room-hero">
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error?.data?.message || error.error}</Message>
      ) : (
        <div className="room-card">
          <div className="room-image-wrapper">
            <img src={room.image} alt={room.name} className="room-image" />
          </div>

          <div className="room-content">
            <h1 className="room-title">{room.name}</h1>
            <p className="room-description">{room.description}</p>

            <h3 className="room-price">{room.price} RON / noapte</h3>

            <div className="room-details-box">
              <p><strong>Check-in:</strong> {checkIn}</p>
              <p><strong>Check-out:</strong> {checkOut}</p>
              <p><strong>Nopți:</strong> {nights}</p>
              <p><strong>Preț total:</strong> {totalPrice} RON</p>
            </div>

            <Button
              className="btn-book-now"
              onClick={bookHandler}
              disabled={!checkIn || !checkOut}
            >
              Rezervă Acum
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomScreen;
