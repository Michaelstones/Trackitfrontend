import styles from './styles.module.css';
import { Socket } from 'socket.io-client';
import { useState, useEffect, useRef } from 'react';

interface Message {
  message: string;
  username: string;
  __createdtime__: number;
}

interface Props {
  socket: Socket; // Replace with the actual socket type
}

const Messages: React.FC<Props> = ({ socket }) => {
  const [messagesReceived, setMessagesReceived] = useState<Message[]>([]);

  const messagesColumnRef = useRef<HTMLDivElement | null>(null);

  // Runs whenever a socket event is received from the server
useEffect(() => {
  const handleReceiveMessage = (data: Message) => {
    // console.log(data);
    setMessagesReceived((state) => [
      ...state,
      {
        message: data.message,
        username: data.username,
        __createdtime__: data.__createdtime__,
      },
    ]);
  };

  socket.on('receive_message', handleReceiveMessage);

  return () => {
    // Cleanup function to remove the event listener when the component unmounts
    socket.off('receive_message', handleReceiveMessage);
  };
}, [socket]);

//   useEffect(() => {
//     // Last 100 messages sent in the chat room (fetched from the db in backend)
//     socket.on('last_100_messages', (last100Messages: string) => {
//       console.log('Last 100 messages:', JSON.parse(last100Messages));
//       last100Messages = JSON.parse(last100Messages);
//       // Sort these messages by __createdtime__
//       last100Messages = sortMessagesByDate(last100Messages);
//       setMessagesReceived((state) => [...last100Messages, ...state]);
//     });

//     return () => socket.off('last_100_messages');
//   }, [socket]);

  // Scroll to the most recent message
  useEffect(() => {
    if (messagesColumnRef.current) {
      messagesColumnRef.current.scrollTop =
        messagesColumnRef.current.scrollHeight;
    }
  }, [messagesReceived]);

//   function sortMessagesByDate(messages: Message[]) {
//     return messages.sort(
//       (a, b) => a.__createdtime__ - b.__createdtime__
//     );
//   }

  // dd/mm/yyyy, hh:mm:ss
  function formatDateFromTimestamp(timestamp: number) {
    const date = new Date(timestamp);
    return date.toLocaleString();
  }

  return (
    <div className={styles.messagesColumn} ref={messagesColumnRef}>
      {messagesReceived.map((msg, i) => (
        <div className={styles.message} key={i}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span className={styles.msgMeta}>{msg.username}</span>
            <span className={styles.msgMeta}>
              {formatDateFromTimestamp(msg.__createdtime__)}
            </span>
          </div>
          <p className={styles.msgText}>{msg.message}</p>
          <br />
        </div>
      ))}
    </div>
  );
};

export default Messages;
