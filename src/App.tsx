  import { BrowserRouter, Routes, Route } from 'react-router-dom';

  import { useState } from 'react';
  // Import your components
  import FormPage from './view/main';
  import InfoPage from './view/infoPage';
import ChatHome from './view/home';
  import Chat from './view/chat';
  // import { Socket } from 'socket.io-client';
import io from 'socket.io-client';
import API_URL from './config';
  const socketOptions = {
  path: '/chat', // Match the path you've set on the server
  withCredentials: true, // Match the credentials setting (if enabled on the server)
};

  const socket = io(`${API_URL}`, socketOptions);

  function App() {

    const [username, setUsername] = useState('');
    const [room, setRoom] = useState('');
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<FormPage />} />
          <Route path="/info" element={<InfoPage />} />
          {/* You can add more routes as needed */}
          <Route path='/chat-home' element={ <ChatHome  username={username}
                  setUsername={setUsername}
                  room={room}
                  setRoom={setRoom}
            socket={socket} />} />
          <Route path='/chat' element={ <Chat username={username} room={room} socket={socket}/>} />
        </Routes>
      </BrowserRouter>
    );
  }

  export default App;