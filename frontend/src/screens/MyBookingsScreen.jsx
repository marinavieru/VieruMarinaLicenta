import { useGetMyBookingsQuery } from '../slices/bookingsApiSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { Table, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const MyBookingsScreen = () => {
  const { data: bookings, isLoading, error } = useGetMyBookingsQuery();

return (
  <div className="admin-wrapper">

    <h2 className="admin-title">Rezervările Mele</h2>

    {isLoading ? (
      <Loader />
    ) : error ? (
      <Message variant="danger">{error?.data?.message || error.error}</Message>
    ) : bookings.length === 0 ? (
      <Message>Nu aveți rezervări</Message>
    ) : (
      <Table striped hover responsive className="table">
        <thead>
          <tr>
            <th>Cameră</th>
            <th>Check-in</th>
            <th>Check-out</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {bookings.map((b) => (
            <tr key={b._id}>
              <td>{b.room?.name || 'Room deleted'}</td>
              <td>{b.checkIn.substring(0, 10)}</td>
              <td>{b.checkOut.substring(0, 10)}</td>

              <td>
                <span className={`status-badge status-${b.status.toLowerCase()}`}>
                  {b.status === 'pending' && 'În așteptare'}
                  {b.status === 'confirmed' && 'Confirmat'}                </span>
              </td>

              <td>
                <LinkContainer to={`/booking/${b._id}`}>
                  <Button className="btn-edit">Detalii</Button>
                </LinkContainer>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    )}
  </div>
);
};

export default MyBookingsScreen;
