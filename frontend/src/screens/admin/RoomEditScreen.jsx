import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { toast } from 'react-toastify';

import { 
  useGetRoomDetailsQuery,
  useUpdateRoomMutation,
  useUploadRoomImageMutation
} from '../../slices/roomsApiSlice';

const RoomEditScreen = () => {
  const { id: roomId } = useParams();

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [roomType, setRoomType] = useState('');
  const [availableRooms, setAvailableRooms] = useState(0);
  const [description, setDescription] = useState('');

  const { data: room, isLoading, refetch, error } = useGetRoomDetailsQuery(roomId);
  const [updateRoom, { isLoading: loadingUpdate }] = useUpdateRoomMutation();
  const [uploadRoomImage, { isLoading: loadingUpload }] = useUploadRoomImageMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (room) {
      setName(room.name);
      setPrice(room.price);
      setImage(room.image);
      setRoomType(room.roomType);
      setAvailableRooms(room.availableRooms);
      setDescription(room.description);
    }
  }, [room]);

  const submitHandler = async (e) => {
    e.preventDefault();

    const updatedRoom = {
      roomId,
      name,
      price,
      image,
      roomType,
      availableRooms,
      description,
    };

    const result = await updateRoom(updatedRoom);

    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success('Cameră actualizată');
      refetch();
      navigate('/admin/roomlist');
    }
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append('image', e.target.files[0]);

    try {
      const res = await uploadRoomImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
  <div className="edit-hero">
    <div className="edit-overlay">

      <Link to="/admin/roomlist" className="edit-back">
        ← Înapoi
      </Link>

      <h1 className="edit-title">Editează Camera</h1>

      {loadingUpdate && <Loader />}

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Form className="edit-box" onSubmit={submitHandler}>

          <Form.Group controlId="name" className="my-3">
            <Form.Label>Nume</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter room name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="price" className="my-3">
            <Form.Label>Preț pe noapte</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="image" className="my-3">
            <Form.Label>Imagine</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter image URL"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />

            <Form.Control
              type="file"
              onChange={uploadFileHandler}
              className="mt-2"
            />

            {loadingUpload && <Loader />}
          </Form.Group>

          <Form.Group controlId="roomType" className="my-3">
            <Form.Label>Tip rezervare</Form.Label>
            <Form.Control
              as="select"
              value={roomType}
              onChange={(e) => setRoomType(e.target.value)}
            >
              <option value="">Alege tip cameră</option>
              <option value="standard">Standard</option>
              <option value="deluxe">Deluxe</option>
              <option value="VIP">VIP</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="availableRooms" className="my-3">
            <Form.Label>Camere disponibile</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter number of available rooms"
              value={availableRooms}
              onChange={(e) => setAvailableRooms(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="description" className="my-3">
            <Form.Label>Descriere</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Introdu prezentare cameră"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>

          <Button type="submit" className="btn-edit-save w-100 mt-3">
            Actualizează Camera
          </Button>

        </Form>
      )}
    </div>
  </div>
);

};

export default RoomEditScreen;
