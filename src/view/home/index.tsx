import { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from './styles.module.css';
import { useNavigate } from 'react-router-dom';
import { Socket } from 'socket.io-client';
import axios from 'axios';

interface HomeProps {
  username?: string;
  setUsername: (username: string) => void;
  room?: string;
  setRoom: (room: string) => void;
  socket: Socket; // Replace 'Socket' with the actual type of 'socket'
}
interface ValueProps {
  room: string;
   username: string;
}
const validationSchema = Yup.object().shape({
  username: Yup.string()
    .required('Username is required')
    .min(3, 'Username must be at least 3 characters'),
  room: Yup.string().required('Room selection is required'),
});

const Home = ({  setUsername, setRoom, socket }:HomeProps) => {
  const navigate = useNavigate();
  const [ipAddress,setIPAddress] = useState()
   useEffect(() => {
    // Fetch the IP address when the component mounts
    axios.get('https://api.ipify.org/?format=json')
      .then((response) => {
        setIPAddress(response.data.ip);
      })
      .catch((error) => {
        console.error('Error fetching IP address:', error);
      });
  }, []);

  const joinRoom = (values:ValueProps) => {
    const { room, username } = values;
    setRoom(room)
    setUsername(username)
    socket.emit('join_room', { username, room, ipAddress });
    navigate('/chat', { replace: true });
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1>{`<>DevRooms</>`}</h1>
        <Formik
          initialValues={{ username: '', room: '' }}
          validationSchema={validationSchema}
          onSubmit={joinRoom}
        >
          <Form>
            <Field
              type="text"
              name="username"
              placeholder="Username..."
              className={styles.input}
            />
            <ErrorMessage
              name="username"
              component="div"
              className={styles.error}
            />

            <Field
              as="select"
              name="room"
              className={styles.input}
            >
              <option value="">-- Select Room --</option>
              <option value="javascript">JavaScript</option>
              <option value="node">Node</option>
              <option value="express">Express</option>
              <option value="react">React</option>
            </Field>
            <ErrorMessage
              name="room"
              component="div"
              className={styles.error}
            />

            <button
              type="submit"
              className='btn btn-secondary'
              style={{ width: '100%' }}
            >
              Join Room
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Home;
