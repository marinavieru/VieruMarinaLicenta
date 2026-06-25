import { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useGetBookingDetailsQuery, useUpdateBookingMutation } from '../../slices/bookingsApiSlice';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { toast } from 'react-toastify';

const AdminBookingEditScreen = () => {
  const { id: bookingId } = useParams();
  const navigate = useNavigate();

  const { data: booking, isLoading, error } = useGetBookingDetailsQuery(bookingId);
  const [updateBooking, { isLoading: loadingUpdate }] = useUpdateBookingMutation();

  const [status, setStatus] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');

  useEffect(() => {
    if (booking) {
      setStatus(booking.status);
      setCheckIn(booking.checkIn.substring(0, 10));
      setCheckOut(booking.checkOut.substring(0, 10));
    }
  }, [booking]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await updateBooking({
        bookingId,
        status,
        checkIn,
        checkOut,
      }).unwrap();

      toast.success('Booking updated');
      navigate('/admin/bookinglist');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

return (
  <div className="edit-hero">
    <div className="edit-overlay">

      <Link to="/admin/bookinglist" className="edit-back">
        ← Înapoi 
      </Link>

      <h1 className="edit-title">Editează Rezervarea</h1>

      {loadingUpdate && <Loader />}

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error?.data?.message || error.error}</Message>
      ) : (
        <Form className="edit-box" onSubmit={submitHandler}>

          <Form.Group className="my-3">
            <Form.Label>Status</Form.Label>
            <Form.Select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="edit-select"
            >
              <option value="pending">În așteptare</option>
              <option value="confirmed">Confirmat</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="my-3">
            <Form.Label>Check-In</Form.Label>
            <Form.Control
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="my-3">
            <Form.Label>Check-Out</Form.Label>
            <Form.Control
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
            />
          </Form.Group>

          <Button type="submit" className="btn-edit-save w-100 mt-3">
            Actualizează Rezervarea
          </Button>

        </Form>
      )}
    </div>
  </div>
);
};

export default AdminBookingEditScreen;
