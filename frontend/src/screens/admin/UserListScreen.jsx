import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import { FaTimes, FaTrash, FaEdit, FaCheck } from 'react-icons/fa';
import Messsage from '../../components/Message';
import Loader from '../../components/Loader';
import { toast } from 'react-toastify';
import { useGetUsersQuery, useDeleteUserMutation } from '../../slices/usersApiSlice';

const UserListScreen = () => {
    const { data: users, refetch, isLoading, error } = useGetUsersQuery();

    const [deleteUser, { isLoading: loadingDelete }] = useDeleteUserMutation();

    const deleteHandler = async (id) => {
      if (window.confirm('Ești sigur că vrei să elimini acest utilizator?')) {
        try {
          await deleteUser(id);
          toast.success('Utilizator eliminat');
          refetch();
        } catch (err) {
          toast.error(err?.data?.message || err.error);
        }
      }
    }


return (
  <div className="admin-wrapper">

    <h1 className="admin-title">Utilizatori</h1>

    {loadingDelete && <Loader />}
    {isLoading ? (
      <Loader />
    ) : error ? (
      <Messsage variant="danger">{error}</Messsage>
    ) : (
      <Table striped hover responsive className="table">
        <thead>
          <tr>
            <th>Nume</th>
            <th>Adresă e-mail</th>
            <th>Este administrator</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>
                <a href={`mailto:${user.email}`}>{user.email}</a>
              </td>

              <td>
                {user.isAdmin ? (
                  <FaCheck className="icon-yes" />
                ) : (
                  <FaTimes className="icon-no" />
                )}
              </td>

              <td>
                <LinkContainer to={`/admin/user/${user._id}/edit`}>
                  <Button className="btn-edit mx-2">
                    <FaEdit />
                  </Button>
                </LinkContainer>

                <Button
                  className="btn-delete"
                  onClick={() => deleteHandler(user._id)}
                >
                  <FaTrash />
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

export default UserListScreen;