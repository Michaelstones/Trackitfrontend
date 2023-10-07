import styles from './styles.module.css';
import RoomAndUsersColumn from './room-and-users';
import SendMessage from './send-message';
import MessagesReceived from './messages';
import { Socket } from 'socket.io-client';


interface Props {
  socket: Socket;
  username: string;
  room: string;
}
const Chat = ({ username, room, socket }:Props) => {
  return (
    <div className={styles.chatContainer}>
      <RoomAndUsersColumn socket={socket} username={username} room={room} />

      <div>
        <MessagesReceived socket={socket} />
        <SendMessage socket={socket} username={username} room={room} />
      </div>
    </div>
  );
};

export default Chat;