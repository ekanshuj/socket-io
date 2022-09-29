import React from 'react';
import './App.css';
import io from 'socket.io-client';
import { useState } from 'react';
import Chats from './Chats';

const socket = io.connect('http://localhost:5000');

const App = () => {

  const [name, setName] = useState('');
  const [pass, setPass] = useState('');
  const [show, setShow] = useState(false);

  const joinRoom = () => {
    if (name !== "" && pass !== "") {
      socket.emit('join_room', pass);
      setShow(true);
    }
  };

  return (
    <div className='App'>
      {!show ? (
        <div className="room_interface">
          <h1>Socket-Io</h1>
          <div className="client">
            <input type="text" name="name" id="name" placeholder='username...' onKeyUp={e => setName(e.target.value)} />
            <br />
            <input type="text" name="key" id="key" placeholder='enter room id...' onKeyUp={(e) => setPass(e.target.value)} />
          </div>
          <button className='btn' type="submit" onClick={joinRoom}>Click</button>
        </div>
      ) : (
        <Chats socket={socket} username={name} room={pass} />
      )}
    </div>
  )
}

export default App