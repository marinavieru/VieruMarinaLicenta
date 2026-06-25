import { useParams } from 'react-router-dom';
import { useGetBookingDetailsQuery } from '../slices/bookingsApiSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';

const statusMap = {
  pending: 'În așteptare',
  confirmed: 'Confirmat',
};


const BookingDetailsScreen = () => {
  const { id: bookingId } = useParams();
  const { data: booking, isLoading, error } = useGetBookingDetailsQuery(bookingId);
return (
  <div className="details-hero">
    {isLoading ? (
      <Loader />
    ) : error ? (
      <Message variant="danger">{error?.data?.message || error.error}</Message>
    ) : (
      <div className="details-card">

        <h1 className="details-title">Detalii Rezervare</h1>

        <div className="details-box">
          <p><strong>Cameră:</strong> {booking.room?.name || 'Room deleted'}</p>
          <p><strong>Check-in:</strong> {booking.checkIn?.substring(0,10)}</p>
          <p><strong>Check-out:</strong> {booking.checkOut?.substring(0,10)}</p>
          <p><strong>Total:</strong> {booking.totalPrice} RON</p>
          <p><strong>Status:</strong> {statusMap[booking.status]}</p>
        </div>

        <a href="/mybookings" className="btn-details-back">
          Înapoi la rezervările mele
        </a>

      </div>
    )}
  </div>
);
};

export default BookingDetailsScreen;
