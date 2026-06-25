import { Table, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useGetBookingsQuery, useDeleteBookingMutation } from '../../slices/bookingsApiSlice';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { toast } from 'react-toastify';

const AdminBookingListScreen = () => {
  const { data: bookings, isLoading, error, refetch } = useGetBookingsQuery();
  const [deleteBooking] = useDeleteBookingMutation();

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      try {
        await deleteBooking(id).unwrap();
        toast.success('Booking deleted');
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

return (
  <div className="admin-wrapper">

    <h1 className="admin-title">Toate Rezervările</h1>

    {isLoading ? (
      <Loader />
    ) : error ? (
      <Message variant="danger">{error?.data?.message || error.error}</Message>
    ) : (
      <Table striped hover responsive className="table">
        <thead>
          <tr>
            <th>Utilizator</th>
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
              <td>{b.user?.name}</td>
              <td>{b.room?.name}</td>
              <td>{b.checkIn.substring(0, 10)}</td>
              <td>{b.checkOut.substring(0, 10)}</td>

              <td>
                <span className={`status-badge status-${b.status.toLowerCase()}`}>
                  {b.status === 'pending' && 'În așteptare'}
                  {b.status === 'confirmed' && 'Confirmat'}
                </span>
              </td>

              <td className="d-flex gap-2">
                <LinkContainer to={`/admin/booking/${b._id}/edit`}>
                  <Button className="btn-edit">Editează</Button>
                </LinkContainer>

                <Button
                  className="btn-delete"
                  onClick={() => deleteHandler(b._id)}
                >
                  Șterge
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    )}
  </div>
);
};

export default AdminBookingListScreen;
