import React, { useState, useEffect } from 'react';
import './Chats.css';

const Chats = ({ socket, username, room }) => {

  const [chats, setChats] = useState('');
  const [allMessages, setAllMessages] = useState([]);

  const callChats = async () => {
    try {
      if (chats !== '') {
        const messageData = {
          room: room,
          author: username,
          message: chats,
          date: new Date(Date.now()).getHours() + ':' + new Date(Date.now()).getMinutes()
        }
        await socket.emit('send_msg', messageData);
        setAllMessages(message => [...message, messageData]);
        setChats('');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    socket.on('receive_msg', (data) => {
      setAllMessages(message => [...message, data]);
    })
  }, [socket]);


  return (
    <div className='chats'>
      <div className="messages">
        <h2>Chats</h2>
        <div className="msg_body">
          {allMessages.map((msg) => {
            return (
              <d iv key={msg.date}
                className="mssgs"
              >
                <div className="message-content">
                  <p id='msg-data'>{msg.message}</p>
                  <p id="time">{msg.date}</p>
                </div>
              </d>
            )
          })}
        </div>
        <div className="chats__info">
          <input type="text" id="chats" onChange={e => setChats(e.target.value)} onKeyPress={e => e.key === 'Enter' && callChats()} />
          <button className='btn' value={chats} onClick={callChats}>&#62;</button>
        </div>
      </div>
    </div>
  )
}

export default Chats