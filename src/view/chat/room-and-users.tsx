import styles from './styles.module.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Socket } from 'socket.io-client';

interface User {
  id: number;
  username: string;
}

interface Props {
  socket: Socket; // Replace with the actual socket type
  username: string;
  room: string;
}

const RoomAndUsers: React.FC<Props> = ({ socket, username, room }) => {
  const [roomUsers, setRoomUsers] = useState<User[]>([]);

  const navigate = useNavigate();

useEffect(() => {
  const handleChatroomUsers = (data: User[]) => {
    console.log(data);
    setRoomUsers(data);
  };

  socket.on('chatroom_users', handleChatroomUsers);

  return () => {
    // Cleanup function to remove the event listener when the component unmounts
    socket.off('chatroom_users', handleChatroomUsers);
  };
}, [socket]);

  const leaveRoom = () => {
    const __createdtime__ = Date.now();
    socket.emit('leave_room', { username, room, __createdtime__ });
    // Redirect to home page
    navigate('/', { replace: true });
  };

  return (
    <div className={styles.roomAndUsersColumn}>
      <h2 className={styles.roomTitle}>{room}</h2>

      <div>
        {roomUsers.length > 0 && <h5 className={styles.usersTitle}>Users:</h5>}
        <ul className={styles.usersList}>
          {roomUsers.map((user) => (
            <li
              style={{
                fontWeight: `${user.username === username ? 'bold' : 'normal'}`,
              }}
              key={user.id}
            >
              {user.username}
            </li>
          ))}
        </ul>
      </div>

      <button className='btn btn-outline submitButton' onClick={leaveRoom} >
        Leave
      </button>
    </div>
  );
};

export default RoomAndUsers;
