import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import Paginate from '../../components/Paginate';
import { toast } from 'react-toastify';

import {
  useGetRoomsQuery,
  useCreateRoomMutation,
  useDeleteRoomMutation
} from '../../slices/roomsApiSlice';

const RoomListScreen = () => {
  const { pageNumber } = useParams();

  const { data, isLoading, error, refetch } = useGetRoomsQuery({ pageNumber });

  const [createRoom, { isLoading: loadingCreate }] = useCreateRoomMutation();
  const [deleteRoom, { isLoading: loadingDelete }] = useDeleteRoomMutation();

  const deleteHandler = async (id) => {
    if (window.confirm('Ești sigur că vrei să ștergi această cameră?')) {
      try {
        await deleteRoom(id);
        toast.success('Cameră eliminată');
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const createRoomHandler = async () => {
    if (window.confirm('Doești să adaugi o cameră nouă?')) {
      try {
        await createRoom();
        toast.success('Camera a fost creată');
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
<>
  <div className="admin-wrapper">
    <Row className="align-items-center">
      <Col>
        <h1 className="admin-title">Camere</h1>
      </Col>
      <Col className="text-end">
        <Button className="btn-beige m-3" onClick={createRoomHandler}>
          <FaEdit /> Adaugă Cameră
        </Button>
      </Col>
    </Row>

    {loadingCreate && <Loader />}
    {loadingDelete && <Loader />}

    {isLoading ? (
      <Loader />
    ) : error ? (
      <Message variant="danger">{error}</Message>
    ) : (
      <>
        <Table striped hover responsive className="table">
          <thead>
            <tr>
              <th>Nume</th>
              <th>Pret</th>
              <th>Tip</th>
              <th>Disponibilitate</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {data.rooms.map((room) => (
              <tr key={room._id}>
                <td>{room.name}</td>
                <td>{room.price} RON</td>
                <td>{room.roomType}</td>
                <td>{room.availableRooms}</td>

                <td>
                  <LinkContainer to={`/admin/room/${room._id}/edit`}>
                    <Button className="btn-edit mx-2">
                      <FaEdit />
                    </Button>
                  </LinkContainer>

                  <Button
                    className="btn-delete"
                    onClick={() => deleteHandler(room._id)}
                  >
                    <FaTrash />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Paginate pages={data.pages} page={data.page} isAdmin={true} />
      </>
    )}
  </div>
</>
  );
};

export default RoomListScreen;
